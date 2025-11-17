export enum MessageSender {
  USER = 'user',
  MODEL = 'model',
}

// Explicit interfaces for nested types within GroundingChunk
export interface ReviewSnippet {
  uri: string;
}

export interface PlaceAnswerSource {
  reviewSnippets?: ReviewSnippet[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: PlaceAnswerSource[]; // Use the new interface here
  };
}

export interface ConversationEntry {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  groundingLinks?: GroundingChunk[];
}

// Re-export Blob from @google/genai for consistency, though it's an object in their SDK.
export interface Blob {
  data: string;
  mimeType: string;
}

// Type for the session handle, which includes sendRealtimeInput and close methods.
export interface LiveChatSession {
  sendRealtimeInput: (input: { media: Blob }) => void;
  sendToolResponse: (toolResponse: {
    functionResponses: { id: string; name: string; response: { result: string } };
  }) => void;
  close: () => void;
}

// New types for authentication and user profiles
export interface User {
  id: string;
  email: string;
  password?: string; // Password is used for signup/login, but not stored in session state
}

export interface UserProfile {
  userId: string;
  name: string;
  interests: string;
}
