import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
// Fix: Import MessageSender to resolve undefined error.
import { Blob, ConversationEntry, LiveChatSession, GroundingChunk, PlaceAnswerSource, ReviewSnippet, MessageSender } from '../types';

// Audio context for input and output
let inputAudioContext: AudioContext | null = null;
let outputAudioContext: AudioContext | null = null;
let scriptProcessorNode: ScriptProcessorNode | null = null;
let mediaStreamSource: MediaStreamAudioSourceNode | null = null;
let mediaStream: MediaStream | null = null;

// The `nextStartTime` variable acts as a cursor to track the end of the audio playback queue.
// Scheduling each new audio chunk to start at this time ensures smooth, gapless playback.
let nextStartTime = 0;
const outputAudioSources = new Set<AudioBufferSourceNode>();

// Global session promise to ensure sendRealtimeInput is called after connection
let sessionPromise: Promise<LiveChatSession> | null = null;

const AI_MODEL_LIVE_AUDIO = 'gemini-2.5-flash-native-audio-preview-09-2025';

interface GeminiServiceCallbacks {
  onTranscriptionUpdate: (input: string, output: string) => void;
  onConversationComplete: (entry: ConversationEntry) => void;
  onError: (message: string) => void;
  onLoading: (isLoading: boolean) => void;
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

let currentInputTranscription = '';
let currentOutputTranscription = '';

export const startConversation = async (callbacks: GeminiServiceCallbacks): Promise<void> => {
  callbacks.onLoading(true);
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Fix: Use `AudioContext` directly, as `webkitAudioContext` is deprecated and may not exist.
    inputAudioContext = new window.AudioContext({ sampleRate: 16000 });
    // Fix: Use `AudioContext` directly, as `webkitAudioContext` is deprecated and may not exist.
    outputAudioContext = new window.AudioContext({ sampleRate: 24000 });
    const outputGainNode = outputAudioContext.createGain();
    outputGainNode.connect(outputAudioContext.destination); // Connect to speakers

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    if (!ai) {
      throw new Error("Failed to initialize GoogleGenAI. API key might be missing.");
    }

    sessionPromise = ai.live.connect({
      model: AI_MODEL_LIVE_AUDIO,
      callbacks: {
        onopen: () => {
          console.log('Gemini Live API session opened.');
          callbacks.onLoading(false);

          mediaStreamSource = inputAudioContext!.createMediaStreamSource(mediaStream!);
          scriptProcessorNode = inputAudioContext!.createScriptProcessor(4096, 1, 1);

          scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            const pcmBlob = createBlob(inputData);
            sessionPromise!.then((session) => {
              session.sendRealtimeInput({ media: pcmBlob });
            }).catch(error => {
              console.error("Error sending realtime input:", error);
              callbacks.onError("Failed to send audio data.");
            });
          };

          mediaStreamSource.connect(scriptProcessorNode);
          scriptProcessorNode.connect(inputAudioContext!.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          // Process output transcription
          if (message.serverContent?.outputTranscription) {
            currentOutputTranscription += message.serverContent.outputTranscription.text;
            callbacks.onTranscriptionUpdate(currentInputTranscription, currentOutputTranscription);
          }
          // Process input transcription
          if (message.serverContent?.inputTranscription) {
            currentInputTranscription += message.serverContent.inputTranscription.text;
            callbacks.onTranscriptionUpdate(currentInputTranscription, currentOutputTranscription);
          }

          // Process model's audio output
          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64EncodedAudioString && outputAudioContext) {
            nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
            const audioBuffer = await decodeAudioData(
              decode(base64EncodedAudioString),
              outputAudioContext,
              24000,
              1,
            );
            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputGainNode);
            source.addEventListener('ended', () => {
              outputAudioSources.delete(source);
            });

            source.start(nextStartTime);
            nextStartTime = nextStartTime + audioBuffer.duration;
            outputAudioSources.add(source);
          }

          // Handle interruption (stop current audio playback)
          if (message.serverContent?.interrupted) {
            for (const source of outputAudioSources.values()) {
              source.stop();
              outputAudioSources.delete(source);
            }
            nextStartTime = 0;
          }

          // Handle turn completion
          if (message.serverContent?.turnComplete) {
            const groundingLinks: GroundingChunk[] = [];
            if (message.serverContent.groundingMetadata?.groundingChunks) {
              for (const chunk of message.serverContent.groundingMetadata.groundingChunks) {
                // Ensure to parse different types of grounding chunks
                if (chunk.web) {
                  groundingLinks.push({ web: { uri: chunk.web.uri, title: chunk.web.title } });
                } else if (chunk.maps) {
                  groundingLinks.push({
                    maps: {
                      uri: chunk.maps.uri,
                      title: chunk.maps.title,
                      // Fix: Cast placeAnswerSources to an array to match application types, resolving a potential SDK type mismatch.
                      placeAnswerSources: (chunk.maps.placeAnswerSources as unknown as PlaceAnswerSource[])?.map((s: PlaceAnswerSource) => ({
                        reviewSnippets: s.reviewSnippets?.map((rs: ReviewSnippet) => ({ uri: rs.uri }))
                      }))
                    }
                  });
                }
              }
            }

            // Create separate entries for user and model for a clearer transcript
            if (currentInputTranscription) {
              callbacks.onConversationComplete({
                id: `${Date.now()}-user`,
                sender: MessageSender.USER,
                text: currentInputTranscription.trim(),
                timestamp: new Date().toLocaleTimeString(),
              });
            }

            if (currentOutputTranscription) {
              callbacks.onConversationComplete({
                id: `${Date.now()}-model`,
                sender: MessageSender.MODEL,
                text: currentOutputTranscription.trim(),
                timestamp: new Date().toLocaleTimeString(),
                groundingLinks: groundingLinks.length > 0 ? groundingLinks : undefined,
              });
            }

            currentInputTranscription = '';
            currentOutputTranscription = '';
            callbacks.onTranscriptionUpdate('', ''); // Clear current transcription
          }
        },
        onerror: (e: ErrorEvent) => {
          console.error('Gemini Live API error:', e);
          callbacks.onError(`Connection error: ${e.message}`);
          callbacks.onLoading(false);
          stopConversation(); // Attempt to clean up
        },
        onclose: (e: CloseEvent) => {
          console.log('Gemini Live API session closed:', e);
          callbacks.onLoading(false);
        },
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction: `You are a friendly and helpful conversational assistant designed to help seniors find volunteer friends to combat loneliness.
Your task is to ask the user exactly 5 questions to understand their interests and hobbies. Ask one question at a time and wait for the user's response before asking the next one.
The questions should be open-ended and designed to learn about what they enjoy doing. For example: "What's a hobby you've always enjoyed?", "Do you like spending time outdoors or indoors?", "Are there any types of music or movies you particularly like?", "What does a perfect, relaxing afternoon look like for you?", and "Is there anything new you've been wanting to learn or try?".
After you have asked 5 questions and received answers, you must pretend to search a database of volunteer profiles.
Then, you will create and present a single, fictional volunteer profile that would be a good match for the user based on their answers. This profile should include a name, a short, friendly bio, and highlight the shared interests.
For example, after the 5 questions, you might say something like: "Thank you for sharing that with me. It gives me a wonderful picture of your interests. Let me look through our volunteer profiles to find a good match for you... (pause) ... Okay, I've found someone who I think you'll get along with wonderfully. Her name is Clara. She's a retired school teacher who loves tending to her rose garden and listening to jazz music, which sounds like a great match for what you enjoy. She also mentioned she loves trying new recipes. It sounds like you two would have so much to talk about."
Speak clearly, patiently, and use simple, warm language. Always be polite and considerate. Do not use any external tools or search. Your entire response is based on this directive.`,
        inputAudioTranscription: {}, // Enable transcription for user input audio.
        outputAudioTranscription: {}, // Enable transcription for model output audio.
      },
    });
  } catch (error) {
    console.error('Failed to start conversation:', error);
    callbacks.onError(`Failed to start conversation: ${(error as Error).message}. Please ensure microphone access is granted.`);
    callbacks.onLoading(false);
    stopConversation();
  }
};

export const stopConversation = async (): Promise<void> => {
  if (sessionPromise) {
    const session = await sessionPromise;
    session.close();
    sessionPromise = null;
  }

  // Stop microphone
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  // Disconnect audio nodes
  if (scriptProcessorNode && mediaStreamSource) {
    mediaStreamSource.disconnect(scriptProcessorNode);
    scriptProcessorNode.disconnect();
    scriptProcessorNode = null;
    mediaStreamSource = null;
  }
  // Close audio contexts
  if (inputAudioContext) {
    inputAudioContext.close();
    inputAudioContext = null;
  }
  if (outputAudioContext) {
    outputAudioContext.close();
    outputAudioContext = null;
  }

  // Stop all playing output audio
  for (const source of outputAudioSources.values()) {
    source.stop();
  }
  outputAudioSources.clear();
  nextStartTime = 0;

  currentInputTranscription = '';
  currentOutputTranscription = '';
};