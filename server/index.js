import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INTERVIEW_SYSTEM_PROMPT, ANALYSIS_SYSTEM_PROMPT } from './systemPrompts.js';
import { VOLUNTEER_CHAT_PROMPT } from './volunteerPrompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// File paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to read users
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

// Helper to write users
const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
};

// Initialize users from file
let users = readUsers();
let chats = [];

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
let openai;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  } else {
    console.warn('Warning: OPENAI_API_KEY is missing. AI features will not work.');
  }
} catch (error) {
  console.warn('Error initializing OpenAI client:', error.message);
}

// Routes
app.get('/', (req, res) => {
  res.send('SilverGuide API is running');
});


app.post('/api/chats', (req, res) => {
  const { volunteerId, volunteerName, slot } = req.body;

  if (!volunteerId || !volunteerName || !slot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const chat = {
    id: chats.length + 1,
    volunteerId,
    volunteerName,
    slot,
    createdAt: new Date().toISOString(),
  };

  chats.push(chat); // save into memory

  console.log("💬 Saved new chat:", chat);

  return res.status(201).json({ success: true, chat });
});


app.get('/api/chats/user/:userId', (req, res) => {
  const { userId } = req.params;

  const userChats = chats.filter(chat => chat.userId === Number(userId));

  return res.json(userChats);
});


// Start server
// --- AI Chat Route ---
app.post('/api/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ message: 'AI service not configured (missing API key)' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid messages format' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4 if available/preferred
      messages: [
        { 
          role: "system", 
          content: INTERVIEW_SYSTEM_PROMPT 
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 250,
      response_format: { type: "json_object" } // Force JSON mode if using compatible model
    });

    const rawContent = completion.choices[0].message.content;
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(rawContent);
    } catch (e) {
      console.warn("AI failed to return JSON, falling back to text wrapper");
      parsedResponse = {
        message: rawContent,
        progress: 10, // Default low progress if we can't parse
        missing_fields: []
      };
    }

    res.json(parsedResponse);

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ message: 'Error generating AI response' });
  }
});

// --- Volunteer Chat Route ---
app.post('/api/volunteer-chat', async (req, res) => {
  const { messages, volunteer } = req.body;

  if (!openai) {
    // Mock response if no API key
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    
    // Simple mock logic
    let mockResponse = `Hello! I'm ${volunteer.name}. I'd love to help you with that.`;
    if (lastUserMessage.toLowerCase().includes('book')) {
      mockResponse = "That sounds like a wonderful book! I'd love to read it with you.";
    } else if (lastUserMessage.toLowerCase().includes('hello') || lastUserMessage.toLowerCase().includes('hi')) {
      mockResponse = `Hi there! It's so nice to meet you. I'm ${volunteer.name}.`;
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return res.json({ message: mockResponse });
  }

  if (!messages || !Array.isArray(messages) || !volunteer) {
    return res.status(400).json({ message: 'Invalid request format' });
  }

  try {
    const systemPrompt = VOLUNTEER_CHAT_PROMPT(volunteer);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: systemPrompt 
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const responseText = completion.choices[0].message.content;
    res.json({ message: responseText });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ message: 'Error generating volunteer response' });
  }
});

// --- Analyze Interview Route ---
app.post('/api/analyze-interview', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ message: 'AI service not configured' });
  }

  const { transcript } = req.body;
  if (!transcript || !Array.isArray(transcript)) {
    return res.status(400).json({ message: 'Invalid transcript format' });
  }

  try {
    // Convert transcript to a readable string
    const conversationText = transcript
      .map(t => `${t.speaker === 'user' ? 'User' : 'SilverGuide'}: ${t.text}`)
      .join('\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: ANALYSIS_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: conversationText
        }
      ],
      temperature: 0.5,
    });

    const rawContent = completion.choices[0].message.content;
    let result;
    try {
      // Try to parse the JSON. Sometimes models add markdown blocks despite instructions.
      const jsonString = rawContent.replace(/```json\n?|```/g, '').trim();
      result = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse AI analysis result:", rawContent);
      // Fallback if JSON parsing fails
      result = {
        summaryMarkdown: "# Interview Summary\n\n(Analysis failed to parse correctly)\n\n" + rawContent,
        structuredData: { skills: [], interests: [], availability: "" }
      };
    }

    res.json(result);

  } catch (error) {
    console.error('OpenAI Analysis Error:', error);
    res.status(500).json({ message: 'Error analyzing interview' });
  }
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, securityQuestion, securityAnswer } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In a real app, hash this!
    name: name || email.split('@')[0],
    securityQuestion,
    securityAnswer: securityAnswer ? securityAnswer.toLowerCase().trim() : null,
    preferences: {}
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

app.get('/api/auth/security-question', (req, res) => {
  const { email } = req.query;
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (!user.securityQuestion) {
    return res.status(400).json({ message: 'No security question set for this account' });
  }

  res.json({ question: user.securityQuestion });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email, securityAnswer, newPassword } = req.body;
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.securityAnswer || user.securityAnswer !== securityAnswer.toLowerCase().trim()) {
    return res.status(401).json({ message: 'Incorrect security answer' });
  }

  user.password = newPassword;
  writeUsers(users);
  res.json({ message: 'Password updated successfully' });
});

// --- User Profile Route ---
app.post('/api/users/profile', (req, res) => {
  const { userId, profileData } = req.body;

  if (!userId || !profileData) {
    return res.status(400).json({ message: 'User ID and profile data are required' });
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user profile - store inside a 'profile' object for matching
  users[userIndex] = {
    ...users[userIndex],
    profile: profileData,
    hasProfile: true,
    updatedAt: new Date().toISOString()
  };

  writeUsers(users);
  res.json({ message: 'Profile updated successfully', user: users[userIndex] });
});

app.listen(PORT, () => {
  console.log(`SilverGuide server running on port ${PORT}`);
});

