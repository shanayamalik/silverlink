import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage (replace with JSON file if needed)
let users = [];
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
  res.json({ message: 'Password updated successfully' });
});

app.listen(PORT, () => {
  console.log(`SilverGuide server running on port ${PORT}`);
});

