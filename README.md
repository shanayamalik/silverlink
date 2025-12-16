# SilverLink

A web application connecting older adults with volunteer companions through an accessible, voice-first interface.

## About

SilverLink addresses social isolation among seniors by providing an easy-to-use platform for finding volunteer companions. The application uses voice interaction and AI to create a natural onboarding experience that removes common technology barriers for older adults.

## Features

- AI-powered voice interview for profile creation
- Smart matching algorithm based on interests, language, and availability
- Accessible interface with large buttons and high contrast mode
- Scheduling system for video calls, phone chats, and in-person visits
- Multi-language support with voice recognition (English, Spanish, Chinese, Hindi, French, Portuguese, Japanese)
- AI chat assistant
- Real-time profile editing

## How to Build and Run

**Prerequisites:**
- Node.js v14 or higher
- npm
- OpenAI API key

**Setup:**

1. Clone and install dependencies:
   ```bash
   git clone <repository-url>
   cd cs260-final-project
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

3. Start the backend server:
   ```bash
   npm run server
   ```

4. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser

## Credits

**Developers:** Shanaya Malik, Carrie Wan, Minghui Wang  
**Course:** CS 260 - Web Programming  
**Institution:** Brigham Young University

## License

Academic project - not licensed for commercial use.
