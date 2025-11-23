// TODO: Simple Express server for SilverGuide prototype
//
// This is a simplified backend for the high-fidelity prototype.
// Uses in-memory storage (or JSON file) instead of a database.
//
// Features to implement:
// 1. User authentication (simple email/password, store in memory or users.json)
// 2. Save user preferences from Easy Task
// 3. Save user interests from AI interview (Difficult Task)
// 4. Save scheduled chats from Medium Task
// 5. OpenAI API integration for voice interview
//
// Required packages (install with npm):
// - express
// - cors
// - dotenv
// - openai (for AI interview)
//
// API Endpoints to create:
//
// POST /api/auth/register
// - Body: { name, email, password, age }
// - Save user to in-memory users array or users.json
// - Return user object (no password)
//
// POST /api/auth/login
// - Body: { email, password }
// - Check credentials
// - Return user object if valid
//
// GET /api/users/:id
// - Return user profile
//
// PUT /api/users/:id/preferences
// - Body: { helpType, communicationStyle, location, agePreference }
// - Update user preferences (Easy Task)
//
// PUT /api/users/:id/interests
// - Body: { interests: [...] }
// - Update user interests (Difficult Task - from AI interview)
//
// POST /api/chats
// - Body: { userId, volunteerId, volunteerName, scheduledDate, scheduledTime, helpType }
// - Save scheduled chat (Medium Task)
//
// GET /api/chats/user/:userId
// - Return all chats for a user
//
// POST /api/ai/chat
// - Body: { message, conversationHistory }
// - Send to OpenAI API
// - Return AI response with follow-up questions
// - Extract interests/preferences from conversation
//
// Example starter code:
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const OpenAI = require('openai');
//
// const app = express();
// const PORT = process.env.PORT || 3001;
//
// // In-memory storage (replace with JSON file if needed)
// let users = [];
// let chats = [];
//
// // Middleware
// app.use(cors());
// app.use(express.json());
//
// // OpenAI setup
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });
//
// // Routes go here...
//
// app.listen(PORT, () => {
//   console.log(`SilverGuide server running on port ${PORT}`);
// });
