import React, { useState, useEffect, useCallback } from 'react';
import { startConversation, stopConversation } from './services/geminiService';
import { ConversationEntry } from './types';
import Button from './components/Button';
import TranscriptDisplay from './components/TranscriptDisplay';

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [currentInputTranscription, setCurrentInputTranscription] = useState('');
  const [currentOutputTranscription, setCurrentOutputTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Callback to update current transcriptions for ongoing speech
  const handleTranscriptionUpdate = useCallback((input: string, output: string) => {
    setCurrentInputTranscription(input);
    setCurrentOutputTranscription(output);
  }, []);

  // Callback for when a full turn (user input + model output) is complete
  const handleConversationComplete = useCallback((entry: ConversationEntry) => {
    setConversationHistory((prevHistory) => {
      // Avoid duplicate entries if both input and output are part of the same turnComplete event
      const lastEntry = prevHistory[prevHistory.length - 1];
      if (lastEntry && lastEntry.text === entry.text && lastEntry.sender === entry.sender) {
        return prevHistory; // Skip if it's a duplicate due to rapid updates
      }
      return [...prevHistory, entry];
    });
    // Ensure current transcriptions are cleared after a turn is complete
    setCurrentInputTranscription('');
    setCurrentOutputTranscription('');
  }, []);

  // Callback for errors from the service
  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setIsRecording(false); // Stop recording on error
    setIsLoading(false);
  }, []);

  // Callback for loading state from the service
  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const toggleConversation = async () => {
    if (isRecording) {
      setIsRecording(false);
      await stopConversation();
      setErrorMessage(null); // Clear error on stop
      setIsLoading(false);
      setCurrentInputTranscription('');
      setCurrentOutputTranscription('');
    } else {
      setErrorMessage(null); // Clear previous errors
      setIsLoading(true);
      await startConversation({
        onTranscriptionUpdate: handleTranscriptionUpdate,
        onConversationComplete: handleConversationComplete,
        onError: handleError,
        onLoading: handleLoading,
      });
      setIsRecording(true);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopConversation(); // Ensure mic and audio context are closed
    };
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col h-screen w-full p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-blue-800 mb-6 drop-shadow-sm">
        Friendly Voice Chatbot
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-lg p-4 mb-6">
        {isLoading && (
          <div className="flex items-center space-x-3 text-blue-600 text-xl mb-4 animate-pulse" role="status">
            <svg
              className="animate-spin h-6 w-6 mr-3 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-lg">Connecting...</span>
          </div>
        )}

        {errorMessage && (
          <p className="text-red-600 text-lg sm:text-xl font-medium mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            Error: {errorMessage}
          </p>
        )}

        <TranscriptDisplay
          history={conversationHistory}
          currentInput={currentInputTranscription}
          currentOutput={currentOutputTranscription}
        />
      </div>

      <div className="sticky bottom-0 bg-white p-4 shadow-xl rounded-t-2xl flex justify-center items-center gap-4 border-t border-gray-200">
        <Button
          onClick={toggleConversation}
          variant={isRecording ? 'danger' : 'primary'}
          size="lg"
          fullWidth
          disabled={isLoading}
          aria-label={isRecording ? 'Stop Conversation' : 'Start Conversation'}
        >
          {isRecording ? (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.75 7.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM12.25 7.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" clipRule="evenodd" />
              </svg>
              Stop Conversation
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              Start Conversation
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default App;
