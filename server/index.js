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
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Routes
app.get('/', (req, res) => {
  res.send('SilverGuide API is running');
});

app.listen(PORT, () => {
  console.log(`SilverGuide server running on port ${PORT}`);
});

