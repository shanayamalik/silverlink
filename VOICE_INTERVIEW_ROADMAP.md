# Voice Interview & AI Implementation Roadmap

This document outlines the step-by-step technical implementation for the "Difficult Task": a real-time voice interview that results in an auto-filled user profile and a downloadable summary.

## Phase 1: The "Ears" (Real-time Transcription)
**Goal:** Convert user speech to text instantly on the screen.

1.  **Choose the Technology:**
    *   **Recommendation:** Use the browser's native **Web Speech API** (`window.SpeechRecognition`) for the frontend. It is free, low-latency, and supports "interim results" (the ghost text effect).
    *   *Alternative:* Use a service like Deepgram or OpenAI Whisper (requires streaming audio to a backend, which is more complex).

2.  **Implementation Steps:**
    *   Create a `useSpeechRecognition` hook.
    *   Initialize `SpeechRecognition` instance.
    *   Handle event listeners:
        *   `onresult`: Capture `event.results`. Distinguish between `isFinal` (committed text) and interim (ghost text).
        *   `onend`: Restart the listener automatically if the interview isn't over (to keep it "always listening").
    *   **State Management:** Append final results to the `transcript` array in `VoiceInterviewPage.jsx`.

## Phase 2: The "Brain" (AI Conversation)
**Goal:** Have the AI understand the user and reply intelligently.

1.  **Backend Setup (Security):**
    *   **Never** store API keys (like OpenAI) on the frontend.
    *   Set up a simple Node.js/Express route in `server/index.js` (e.g., `/api/chat`).

2.  **Conversation Logic:**
    *   **Trigger:** When the user stops speaking (silence detected for > 1.5s) OR clicks "Send".
    *   **Payload:** Send the recent transcript history to the backend.
    *   **System Prompt:** Define the AI's persona.
        *   *Example:* "You are SilverGuide, a friendly volunteer coordinator. Keep responses short (under 2 sentences). Ask one question at a time."
    *   **Response:** The backend returns the AI's text response.

## Phase 3: The "Voice" (Text-to-Speech)
**Goal:** Make the AI speak its response back to the user.

1.  **Implementation:**
    *   Use the native **Web Speech API** (`window.speechSynthesis`).
    *   Create a function `speak(text)`.
    *   Select a "friendly" voice (look for "Google US English" or similar system voices).
    *   **Sync:** Highlight the AI's text bubble while it is speaking.

## Phase 4: The "Analyst" (Extraction & Markdown)
**Goal:** Process the interview data into a useful format.

1.  **Trigger:**
    *   User clicks "Finish Interview".

2.  **Backend Processing:**
    *   Create an endpoint `/api/analyze-interview`.
    *   Send the *entire* transcript to an LLM (GPT-4).
    *   **Complex Prompting:**
        *   "Analyze this interview transcript."
        *   "1. Create a summary in Markdown format with bolded keywords."
        *   "2. Extract the following structured data in JSON: { skills: [], interests: [], availability: '' }."

3.  **Markdown File Generation:**
    *   Frontend receives the Markdown string.
    *   Create a `Blob` object with MIME type `text/markdown`.
    *   Create a hidden `<a>` tag to trigger the download of `interview_summary.md`.

## Phase 5: The "Handover" (Auto-fill Profile)
**Goal:** seamless transition from interview to profile creation.

1.  **State Update:**
    *   Take the JSON data extracted in Phase 4.
    *   Update the global application state (e.g., `UserContext` or pass via React Router `state`).

2.  **Navigation:**
    *   Redirect the user to the `ProfileTagsLive` page (or Profile Edit page).
    *   **Animation:** This is where the "flying chips" animation happens—visualizing the extracted keywords settling into their input fields.

## Summary of Required Tech Stack
*   **Frontend:** React, Web Speech API (Recognition & Synthesis).
*   **Backend:** Node.js/Express (already in project structure).
*   **AI Service:** OpenAI API (for chat and extraction).

## Next Immediate Steps
1.  Set up the `server/` folder with a basic Express app.
2.  Get an OpenAI API Key (if not already available).
3.  Replace the "Mock Simulation" in `VoiceInterviewPage.jsx` with the real `SpeechRecognition` logic.
