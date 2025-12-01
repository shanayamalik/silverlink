# SilverGuide - Project Structure (2-Week Sprint)

## Streamlined Directory Structure

```
cs260-final-project/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── icons/                                # SVG icons (conversation, hobby, tech, mic, etc.)
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx                    # Large, accessible button
│   │   │   ├── Card.jsx                      # Reusable card wrapper
│   │   │   └── Header.jsx                    # Navigation header with back/home
│   │   │
│   │   ├── HelpTypeTiles.jsx                 # EASY TASK: Help type selection tiles
│   │   ├── PreferenceSelector.jsx            # EASY TASK: Basic preferences (chatty/quiet, etc.)
│   │   │
│   │   ├── VolunteerCard.jsx                 # MEDIUM TASK: Single volunteer display
│   │   ├── VolunteerComparison.jsx           # MEDIUM TASK: Side-by-side 2-3 volunteers
│   │   ├── SchedulingCalendar.jsx            # MEDIUM TASK: Time slot picker
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                      # Landing page with main actions
│   │   ├── LoginPage.jsx                     # Simple login/signup
│   │   ├── PreferencesPage.jsx               # EASY TASK page
│   │   ├── VolunteersPage.jsx                # MEDIUM TASK page (browse + schedule)
│   │   ├── VoiceInterviewPage.jsx            # HARD TASK page
│   │   └── DashboardPage.jsx                 # Dashboard with upcoming chats
│   │
│   ├── data/
│   │   ├── mockVolunteers.js                 # Hardcoded volunteer data (no backend needed)
│   │   └── mockUsers.js                      # Sample user profiles
│   │
│   ├── utils/
│   │   ├── matching.js                       # Simple matching algorithm
│   │   └── localStorage.js                   # Save preferences locally
│   │
│   ├── styles/
│   │   ├── global.css                        # Global styles + accessibility
│   │   └── variables.css                     # Colors, font sizes, spacing
│   │
│   ├── App.jsx                               # Main app with routing
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js


## Recommended Tech Stack

**Frontend Only (No Backend!):**
- **React** with **Vite** (fast setup)
- **React Router** (navigation)
- **React Context API** (minimal state management)
- **Plain CSS** (avoid learning new styling libraries)
- **LocalStorage** (save user data in browser)

**Voice/AI (Keep It Simple):**
- **Web Speech API** (built into browser - free!)
- **OpenAI API** (for AI responses - just need API key)
- Mock responses for demo if API costs are too high

**Mock Data:**
- Hardcoded volunteer profiles in `mockVolunteers.js`
- No database needed - use LocalStorage for persistence

**Deployment:**
- **Vercel** or **Netlify** (free, one-click deploy)


## Implementation Order (Dependencies)

### Phase 1: Foundation (Must Do First)
1. **Project Setup**
   - Initialize Vite + React project
   - Install dependencies (React Router)
   - Set up folder structure

2. **Mock Data**
   - Create `mockVolunteers.js` with volunteer profiles
   - Create `mockUsers.js` with sample user data

3. **Core Utilities**
   - `localStorage.js` - save/load user preferences
   - `matching.js` - basic matching algorithm
   - `variables.css` - CSS variables (colors, font sizes, spacing)
   - `global.css` - base accessibility styles

4. **Common Components** (Needed by all pages)
   - `Button.jsx` - Large, accessible button
   - `Card.jsx` - Reusable card wrapper
   - `Header.jsx` - Navigation with back/home buttons

5. **Basic Routing & Layout**
   - `App.jsx` - Main app with React Router setup
   - `HomePage.jsx` - Landing page (can be simple placeholder)


### Phase 2: Easy Task (Prerequisites: Phase 1)
6. **HelpTypeTiles Component**
   - Large tile buttons for help type selection
   - Icons for each type (Conversation, Hobby, Tech Help)

7. **PreferenceSelector Component**
   - Toggle/button options for preferences (quiet/chatty, nearby/far, age)

8. **PreferencesPage Integration**
   - Combine HelpTypeTiles + PreferenceSelector
   - Save selections to localStorage
   - Navigation to next step


### Phase 3: Medium Task (Prerequisites: Phase 1 + Phase 2)
9. **VolunteerCard Component**
   - Display single volunteer with photo, name, badges
   - Show matching interests

10. **VolunteerComparison Component**
    - Side-by-side display of 2-3 volunteers
    - Uses VolunteerCard internally
    - Highlight differences/similarities

11. **SchedulingCalendar Component**
    - Visual time slot picker
    - Large, touch-friendly buttons for dates/times

12. **VolunteersPage Integration**
    - Load preferences from localStorage
    - Filter volunteers using matching algorithm
    - Display VolunteerComparison
    - Navigate to SchedulingCalendar
    - Save scheduled chat to localStorage


### Phase 4: Difficult Task (Prerequisites: Phase 1)
13. **VoiceInterviewPage Integration**
    - Combine all voice components
    - Microphone button (record/stop)
    - Web Speech API integration
    - Send transcribed text to OpenAI (or mock AI)
    - Orchestrate all sub-components
    - Save final profile to localStorage
    - Navigate to summary/confirmation


### Phase 5: Dashboard & Polish (Can be done anytime after Phase 1)
18. **DashboardPage**
    - Show upcoming scheduled chats
    - Display current preferences/profile summary
    - Quick action buttons to main tasks

19. **LoginPage** (Optional - can hardcode a user)
    - Simple email/password form
    - Save user to localStorage
    - Redirect to HomePage

20. **Accessibility Features**
    - Text size controls (A / A+)
    - High contrast mode toggle
    - Ensure keyboard navigation works


### Phase 6: Final Integration & Testing
21. **Connect All Pages**
    - Ensure smooth navigation between all pages
    - Test data persistence with localStorage
    - Verify all 3 tasks work end-to-end

22. **Error Handling**
    - Handle missing data gracefully
    - Show helpful messages when things go wrong
    - Offline state messaging

23. **Deploy**
    - Build production version
    - Deploy to Vercel/Netlify
    - Test live version


## Key Simplifications

✅ **Do This:**
- Use mock data (no backend)
- LocalStorage for persistence
- Web Speech API (free, built-in)
- Simple CSS (no complex frameworks)
- Focus on the 3 core tasks

❌ **Skip This (For Now):**
- Database/server
- User authentication (just hardcode a user)
- Real messaging system
- Email notifications
- Admin panel
- Extensive testing
