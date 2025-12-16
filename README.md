# SilverLink 🤝

**Connecting seniors with volunteer companions for meaningful relationships and support.**

## About

SilverLink is a web application designed to bridge the gap between older adults seeking companionship and volunteers willing to help. The platform addresses the challenge of social isolation among seniors by providing an accessible, voice-first interface that removes barriers to technology adoption.

**Why this project?** Many seniors struggle with complex interfaces and small text, making traditional volunteer-matching platforms inaccessible. SilverLink uses voice interaction and AI to create a natural, conversational onboarding experience that feels less like filling out forms and more like talking to a friend.

**Key technologies chosen:**
- **Web Speech API** - Enables voice interaction without requiring downloads or special hardware
- **OpenAI GPT-3.5** - Powers natural conversation flow and intelligent profile generation
- **React + Vite** - Fast development and modern component architecture for maintainability
- **Express.js** - Lightweight backend suitable for rapid prototyping and API integration
- **CSS Variables** - Dynamic theming system for accessibility features (font size, contrast)

---

## 📋 Features

- **AI Voice Interview** - Natural conversation to create personalized profile (supports 7 languages)
- **Smart Matching Algorithm** - Matches seniors with compatible volunteers based on interests, language, location, and availability
- **Accessible Dashboard** - Simple interface with large buttons, high contrast mode, and screen reader support
- **Scheduling System** - Create and manage visits with volunteers (Zoom, phone, in-person, etc.)
- **Multi-language Support** - Interface and voice recognition in 7 languages with text-to-speech
- **AI Chat Assistant** - Contextual help throughout the platform
- **Profile Customization** - Inline editing of preferences, interests, and bio

---

## 🚀 How to Build and Run

### Prerequisites
- **Node.js** v14 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Installation & Setup

1. **Clone and install dependencies**
   \`\`\`bash
   git clone <repository-url>
   cd cs260-final-project
   npm install
   \`\`\`

2. **Configure environment variables**
   
   Create a \`.env\` file in the root directory:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   \`\`\`

3. **Start the backend server**
   \`\`\`bash
   npm run server
   \`\`\`
   Backend runs on \`http://localhost:3001\`

4. **Start the frontend (in a new terminal)**
   \`\`\`bash
   npm run dev
   \`\`\`
   Frontend runs on \`http://localhost:5173\`

5. **Open in browser**
   
   Navigate to \`http://localhost:5173\` and create an account to get started

---

## 📁 Project Structure

\`\`\`
cs260-final-project/
├── src/
│   ├── components/          # UI components (VoiceInterview, VolunteerCard, etc.)
│   ├── pages/               # Main pages (HomePage, DashboardPage, etc.)
│   ├── data/                # Mock data for volunteers
│   ├── utils/               # Helper functions (matching algorithm, localStorage)
│   └── styles/              # Global CSS and variables
├── server/
│   ├── index.js             # Express backend server
│   ├── prompts/             # OpenAI prompt templates
│   └── data/users.json      # File-based user storage
├── public/                  # Static assets and icons
└── package.json
\`\`\`

---

## 🛠️ Technology Stack

**Frontend**
- React + React Router (navigation)
- Vite (build tool)
- Web Speech API (voice recognition & text-to-speech)
- CSS Variables (theming and accessibility)

**Backend**
- Express.js (REST API)
- OpenAI API (GPT-3.5-turbo for AI features)
- Node.js file system (data persistence)

**Accessibility**
- WCAG 2.1 AA compliant
- Large touch targets (44x44px minimum)
- High contrast mode and adjustable font sizes

---

## 🔄 How to Use

### First-Time Users
1. **Sign Up** - Create an account with your name, email, and a security question
2. **Voice Interview** - Click "Start Interview" and have a natural conversation with the AI (or type if you prefer)
3. **Review Profile** - Check the auto-generated profile and edit any preferences
4. **Explore Matches** - Browse volunteers matched to your interests and availability
5. **Schedule Visits** - Book video calls, phone chats, or in-person meetings

### Test Credentials
No 🚧 Challenges & Future Improvements

**Current Limitations:**
- Uses mock volunteer data (not real profiles)
- Browser localStorage for user preferences (not persistent across devices)
- File-based backend (`users.json`) instead of database
- Basic authentication (no JWT/OAuth)
- Simulated messaging (not real-time)
- Relies on browser Speech API (limited browser support)

**Planned Enhancements:**
- Database integration (PostgreSQL) for persistent data
- Real-time messaging with WebSockets
- Volunteer registration and verification system
- Mobile app for iOS/Android
- Video call integration
- Calendar sync (Google Calendar, iCaltent across devices)
- File-based backend (\`users.json\`) instead of database
- Basic authentication (no JWT/OAuth)
- Simulated messaging (not real-time)
- Relies on browser Speech API (limited browser support)

---

## 🧪 Development Commands

\`\`\`bash
npm👥 Credits

**Developers**: Shanaya Malik, Carrie Wan, Minghui Wang  
**Course**: CS 260 - Web Development  
**Institution**: University of California, Berkeley

**Special Thanks:**
- OpenAI for GPT-3.5 API access
- BYU CS Department for project guidance
- Mock volunteer profiles inspired by real senior care programs

---

## 📝 License

Academic project - not licensed for commercial use.

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development with React and Express
- RESTful API design and implementation
- Third-party API integration (OpenAI)
- Accessibility-first design principles (WCAG 2.1 AA)
- Voice user interface implementation
- Client-side routing and state management
- File-based data persistence for prototyping
**CS 260 Final Project** - Brigham Young University

This project demonstrates full-stack web development with React/Express, RESTful API design, OpenAI integration, accessibility-first design, voice user interfaces, and client-side routing.

---

## 📝 License

Academic project - not licensed for commercial use.
