# SilverLink 🤝

**Connecting seniors with volunteer companions for meaningful relationships and support.**

SilverLink is a web application designed to help older adults find and connect with volunteers who can provide companionship, assistance with daily activities, and social engagement. The platform uses AI-powered voice interviews to create personalized profiles and smart matching algorithms to connect users with compatible volunteers.

---

## 🌟 Key Features

### For Seniors
- **AI Voice Interview** - Create your profile by having a natural conversation (supports 7 languages)
- **Smart Matching** - Get matched with volunteers based on shared interests, availability, and preferences
- **Easy Scheduling** - Book video calls, phone chats, or in-person visits with simple forms
- **Messaging** - Chat with your matched volunteers directly in the app
- **Accessibility First** - Large buttons, high contrast mode, text-to-speech, and font size controls

### Core Functionality
- **Voice-First Onboarding** - Natural language interview extracts interests, availability, and preferences
- **Volunteer Profiles** - View detailed profiles with interests, skills, availability, and verification badges
- **Visit Management** - Schedule, edit, and manage upcoming visits with multiple meeting types (Zoom, Phone, In-Person, etc.)
- **AI Chat Support** - Get help from Community Support AI or chat with volunteer profiles
- **Multi-Language Support** - Interface and voice recognition in English, Spanish, Chinese, Hindi, French, Portuguese, and Japanese

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shanayamalik/cs260-final-project.git
   cd cs260-final-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server/` directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

4. **Start the development servers**
   
   In one terminal, start the backend:
   ```bash
   node server/index.js
   ```
   
   In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

5. **Open the app**
   
   Navigate to `http://localhost:5173` in your browser

---

## 📁 Project Structure

```
cs260-final-project/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Header.jsx
│   │   ├── VolunteerCard.jsx
│   │   ├── SchedulingCalendar.jsx
│   │   └── ProfileMenu.jsx
│   ├── pages/            # Main application pages
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── VoiceInterviewPage.jsx
│   │   ├── ProfileCreationPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── VolunteersPage.jsx
│   ├── data/             # Mock data for volunteers
│   │   ├── mockVolunteers.js
│   │   └── mockUsers.js
│   ├── utils/            # Helper functions
│   │   ├── matching.js   # Volunteer matching algorithm
│   │   └── localStorage.js
│   └── styles/           # Global styles and CSS variables
├── server/
│   ├── index.js          # Express server
│   ├── systemPrompts.js  # AI prompts for interview
│   ├── volunteerPrompts.js
│   └── data/
│       └── users.json    # Persisted user data
├── public/               # Static assets
└── package.json
```

---

## 🎯 User Flow

1. **Sign Up** → Create account with email/password
2. **Voice Interview** → AI conducts 5-minute conversation to learn about you
3. **Profile Creation** → Review and edit auto-generated profile
4. **Dashboard** → View matches, schedule visits, send messages
5. **Volunteers** → Browse and connect with matched volunteers

---

## 🛠️ Technologies Used

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Web Speech API** - Voice recognition and text-to-speech

### Backend
- **Express.js** - REST API server
- **OpenAI API** - GPT-3.5-turbo for conversational AI
- **Node.js** - Runtime environment
- **File-based storage** - JSON files for user persistence

### Design & Accessibility
- **CSS Variables** - Consistent theming
- **Responsive Design** - Mobile-friendly layouts
- **WCAG Guidelines** - Accessibility-first approach
- **Large Touch Targets** - 44x44px minimum button sizes

---

## 🧪 Key Components

### AI Voice Interview (`VoiceInterviewPage.jsx`)
- Uses Web Speech API for voice input
- Streams conversation to OpenAI API
- Tracks interview progress (0-100%)
- Provides live transcript
- Supports text input as fallback
- Multi-language support

### Matching Algorithm (`utils/matching.js`)
- **Hard Requirements** - Filters by language, help type, availability overlap
- **Soft Scoring** - Ranks by shared interests, communication style, age preference
- Returns top matches with match percentage

### Dashboard (`DashboardPage.jsx`)
- Tabbed interface: Dashboard, Matches, Messages, Schedule, Profile
- Edit profile inline with interest tags
- Schedule management with edit/delete functionality
- Real-time message indicators

### Scheduling System
- Create new visits with volunteer, activity, meeting type, date/time
- Edit existing visits without starting over
- Multiple meeting types: Zoom, Phone, FaceTime, Google Meet, Skype, In-Person
- Visual date badges (color-coded by month)

### Profile Menu & Navigation
- Global profile menu accessible from all authenticated pages
- Quick navigation to Dashboard tabs (Profile, Schedule, Messages, Matches)
- Integrated Help Center with FAQ and guides
- Settings and sign out functionality

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/security-question` - Get security question for password reset
- `POST /api/auth/reset-password` - Reset password with security answer

### AI Features
- `POST /api/chat` - Conversational AI for voice interview
- `POST /api/analyze-interview` - Extract profile data from interview transcript
- `POST /api/volunteer-chat` - Chat with volunteer profiles or community support

### User Data
- `POST /api/users/profile` - Save user profile after interview

---

## ♿ Accessibility Features

- **Visual**: High contrast mode, adjustable font sizes (S/M/L/XL), reduce motion option
- **Motor**: Large buttons (44x44px min), simple navigation, undo/back options
- **Cognitive**: Simple language, progress indicators, clear feedback
- **Auditory**: Live transcripts, visual indicators for audio cues
- **Multi-modal**: Voice + text input, TTS for AI responses

---

## 🌐 Multi-Language Support

Supported languages with full speech recognition and TTS:
- English
- Spanish (Español)
- Chinese (中文)
- Hindi (हिंदी)
- French (Français)
- Portuguese (Português)
- Japanese (日本語)

---

## 📝 Known Limitations

### Current Prototype Scope
- **Mock Data** - Volunteers are pre-defined mock data, not real users
- **Local Storage** - Some data stored in browser localStorage (not production-ready)
- **File-based Backend** - Uses JSON files instead of database
- **No Authentication Tokens** - Basic auth without JWT/sessions
- **No Real-time Messaging** - Messages are simulated, not live chat
- **Browser Speech API** - Voice features require Chrome/Edge for best support

### Future Enhancements
- Database integration (PostgreSQL/MongoDB)
- Real-time messaging with WebSockets
- Volunteer registration and profiles
- Background checks and verification system
- Calendar integration (Google Calendar, iCal)
- Mobile app (React Native)
- Video call integration
- Payment/donation system

---

## 🧑‍💻 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Code Style
- ESLint configured for React
- Prettier for code formatting
- Component-based architecture
- Inline styles for simplicity (can be migrated to CSS modules)

---

## 📄 License

This project is for educational purposes as part of CS 260.

---

## 👥 Credits

**Developers**: Shanaya Malik, Carrie Wan, Minghui Wang  
**Course**: CS 260 - Web Development  
**Institution**: University of California, Berkeley

### Acknowledgments
- OpenAI for GPT API
- React and Vite communities
- Web Speech API documentation
- Accessibility guidelines from WCAG

---

## 📞 Support

For questions or issues:
- Check the Help Center in the app
- Review this README
- Contact: [your email if you want to include it]

---

## 🎓 Academic Context

This project demonstrates:
- Full-stack web development with React and Express
- RESTful API design
- AI integration with OpenAI
- User-centered design for accessibility
- Voice interface design
- Client-side routing and state management
- File-based data persistence

**Note**: This is a prototype built for educational purposes. Not all features are production-ready.
