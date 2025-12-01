# SilverGuide - Implementation Checklist

Track your progress as you build the app! Check off items as you complete them.

---

## Phase 1: Foundation 

### Project Setup & Routing
- [x] Run `npm install` to install all dependencies
- [x] Create `.env` file from `server/.env.example`
- [x] Implement basic routing in `src/App.jsx`
  - [x] Import all page components
  - [x] Set up React Router with BrowserRouter
  - [x] Define routes: /, /home, /preferences, /volunteers, /interview, /dashboard
- [x] Test navigation between pages (pages can be empty for now)
- [x] Verify app runs with `npm run dev`

### Design System & Common Components
- [x] Implement `src/styles/variables.css`
  - [x] Define color palette (primary, secondary, text, background, focus)
  - [x] Define font sizes (base: 20px, large, xlarge, heading)
  - [x] Define spacing values (xs, sm, md, lg, xl)
  - [x] Define border radius and shadows
- [x] Implement `src/styles/global.css`
  - [x] CSS reset and base styles
  - [x] Body font family and size
  - [x] Focus states for accessibility
  - [x] Link styles
- [x] Build `src/components/common/Button.jsx`
  - [x] Props: children, onClick, variant, size, disabled, fullWidth
  - [x] Large, accessible styling (min 44x44px)
  - [x] Variants: primary, secondary, outline
- [x] Build `src/components/common/Card.jsx`
  - [x] Props: children, title, onClick, hoverable
  - [x] Consistent padding, rounded corners, shadow
- [ ] Build `src/components/common/Header.jsx`
  - [ ] Props: title, showBack, showHome
  - [ ] Navigation buttons with icons
  - [ ] Responsive layout

### Mock Data & Utilities
- [ ] Populate `src/data/mockVolunteers.js`
  - [ ] Create 15-20 diverse volunteer objects
  - [ ] Include: id, name, photo, age, location, interests, communicationStyle, bio, verified, availability
  - [ ] Vary interests, ages (50-80), communication styles
- [ ] Implement `src/utils/localStorage.js`
  - [ ] `saveUser(user)` / `getUser()`
  - [ ] `savePreferences(preferences)` / `getPreferences()`
  - [ ] `saveInterests(interests)` / `getInterests()`
  - [ ] `saveScheduledChat(chat)` / `getScheduledChats()`
  - [ ] `clearAllData()`
- [ ] Implement `src/utils/matching.js`
  - [ ] `matchVolunteers(volunteers, preferences)` function
  - [ ] Score volunteers based on preferences
  - [ ] Filter and sort by match score
  - [ ] Return top matches

**Checkpoint:** ✅ App runs, pages navigate, components render, mock data loads

---

## Phase 2: Easy Task + Authentication 

### Easy Task - PreferencesPage
- [ ] Implement `src/components/HelpTypeTiles.jsx`
  - [ ] Display 3 large tiles: Conversation, Hobby Buddy, Tech Help
  - [ ] Use icons from `public/icons/`
  - [ ] Highlight selected tile
  - [ ] Props: onSelect, selectedType
- [ ] Implement `src/components/PreferenceSelector.jsx`
  - [ ] 3 preference options: Communication Style, Location, Age
  - [ ] Large toggles or sliders
  - [ ] Props: onPreferencesChange, initialPreferences
- [ ] Implement `src/pages/PreferencesPage.jsx`
  - [ ] Use Header, HelpTypeTiles, PreferenceSelector, Button
  - [ ] Save selections to localStorage
  - [ ] Navigate to /volunteers on Continue
- [ ] Test complete Easy Task flow

### Authentication & Home
- [x] Implement `src/pages/LoginPage.jsx`
  - [x] Email and password input fields (large, accessible)
  - [x] "Log In" button
  - [x] Save user to localStorage on login (Mocked)
  - [x] Navigate to /volunteers after login
  - [x] (Optional) Simple validation
  - [x] Minimalist design update (Compact mode)
- [x] Implement `src/pages/SignUpPage.jsx`
  - [x] Multi-step wizard (Name/Email/Password -> Security Question)
  - [x] Auto-redirect if already logged in
  - [ ] **TODO:** Add User Role selection (Volunteer / Senior / Both)
- [x] Implement `src/pages/ForgotPasswordPage.jsx`
  - [x] Email lookup
  - [x] Security question verification
  - [x] Password reset
- [x] Implement `src/pages/HomePage.jsx`
  - [x] Welcome message
  - [x] "How it Works" section
  - [x] Navigation to Login/Sign Up
  - [x] Use Header component (Custom nav implemented)
  - [x] Logged-in state (Sign Out button)
- [x] Test login → home → navigation flow

### Backend Setup
- [x] Implement `server/index.js`
  - [x] Set up Express with cors and body-parser
  - [x] In-memory storage (users array, chats array)
  - [x] POST /api/auth/register endpoint
  - [x] POST /api/auth/login endpoint
  - [x] GET /api/auth/security-question endpoint
  - [x] POST /api/auth/reset-password endpoint
  - [x] Persist users to `server/data/users.json`
  - [ ] PUT /api/users/:id/preferences endpoint
  - [ ] GET /api/users/:id endpoint
- [ ] Test backend with Postman/Thunder Client
- [x] Run server with `npm run server`
- [x] Test frontend calling backend APIs

**Checkpoint:** ✅ User can log in, set preferences, save to backend

---

## Phase 3: Medium Task - VolunteersPage 

### Person 1: Volunteer Display Components
- [x] Implement `src/components/VolunteerCard.jsx`
  - [x] Props: volunteer, onClick, selected, compact
  - [x] Display photo/icon, name, verified badge
  - [x] Display profession/role tag (instead of location)
  - [x] "Can help with" section
  - [x] Dynamic button text ("Chat with..." vs "Request Help") based on context
  - [x] Large, tap-friendly card (Border variant)
- [ ] Implement `src/components/VolunteerComparison.jsx`
  - [ ] Props: volunteers (2-3), onSelect, selectedId
  - [ ] Side-by-side layout (responsive: stack on mobile)
  - [ ] Use VolunteerCard with compact prop
  - [ ] "Select" button on each card
- [ ] Test with mock volunteer data

### Scheduling Component
- [ ] Implement `src/components/SchedulingCalendar.jsx`
  - [ ] Props: volunteerId, volunteerName, onSchedule, availableSlots
  - [ ] Simple calendar/date picker (week view)
  - [ ] Large date buttons (min 50x50px)
  - [ ] Time slot options (Morning, Afternoon, Evening)
  - [ ] Confirmation button
  - [ ] Visual feedback for selected date/time
- [ ] Test scheduling flow with mock data

### VolunteersPage Integration
- [ ] Implement `src/pages/VolunteersPage.jsx`
  - [ ] Load preferences from localStorage
  - [ ] Filter volunteers using matching algorithm
  - [ ] Display top 2-3 matches with VolunteerComparison
  - [ ] Toggle to SchedulingCalendar on volunteer selection
  - [ ] Save scheduled chat to localStorage and backend
  - [ ] Navigate to /dashboard after booking
- [ ] Add backend endpoint: POST /api/chats
- [ ] Add backend endpoint: GET /api/chats/user/:userId
- [ ] Test complete Medium Task flow (preferences → volunteers → schedule)

**Checkpoint:** ✅ User can browse volunteers, compare, and schedule a chat

---

## Phase 4: Difficult Task - AI Voice Interview 

### Step 1: The Conversation (Focus Mode)
- [x] Implement `src/pages/VoiceInterviewPage.jsx`
  - [x] Minimalist UI: AI Avatar/Icon + Current Question
  - [x] Large Microphone Button (Start/Stop)
  - [x] Live Transcript Display (Large, readable text)
  - [x] Real-time Speech-to-Text using Web Speech API

### Step 2: AI Intelligence & Backend
- [ ] **TODO: MINGHUI & CARRIE** - Create your own OpenAI API Key and add it to your local `.env` file (`OPENAI_API_KEY=sk-...`)
- [x] Implement `server/index.js` endpoints
  - [x] `POST /api/chat`: Handles conversation turn with OpenAI
  - [x] `POST /api/analyze-interview`: Generates profile JSON and Markdown summary
- [x] **Privacy Filter**: (Basic implementation via system prompt instructions)

### Step 3: The Handover & Profile Creation
- [x] Implement `src/pages/ProfileCreationPage.jsx`
  - [x] "Subtle Pastel" Design (Option K)
  - [x] Auto-fill Bio, Interests, and Availability from Interview Data
  - [x] Editable fields for user refinement
  - [x] Categorized Interest Selection Modal
- [x] Connect Interview to Profile
  - [x] Auto-navigation after interview finishes
  - [x] Pass analysis data via React Router state
- [x] PDF Summary Download
  - [x] Generate `interview_summary.pdf` on client-side
  - [x] "Interview Notes" button next to Bio header

### Remaining Tasks
- [x] **Data Persistence:** Implement "Save Profile" on `ProfileCreationPage.jsx`
  - [x] Create backend endpoint `POST /api/users/profile`
  - [x] Save final profile data to `users.json` or database
- [ ] **Validation:** Ensure required fields (About Me, Interests) are filled before saving
- [ ] **UX Improvements:**
  - [ ] Add full-screen loading overlay during AI analysis
  - [ ] Improve "About Me" generation (more robust bio)
- [ ] **Optional:** Text-to-Speech (TTS) for AI responses
- [ ] **Optional:** "Flying Chips" animation for keyword extraction

### Integration & Testing
- [x] Integrate all components in `src/pages/VoiceInterviewPage.jsx`
- [x] Test full flow:
  - [x] Start interview -> Speak -> See Transcript
  - [x] Finish -> Auto-redirect to Profile
  - [x] View pre-filled data -> Edit -> Download PDF
  - [x] Save Profile (currently to localStorage)

**Checkpoint:** ✅ AI voice interview works, extracts interests, updates profile safely

---

## Phase 5: Dashboard & Polish (Days 11-12)

### Dashboard
- [ ] Implement `src/pages/DashboardPage.jsx`
  - [ ] Load scheduled chats from backend/localStorage
  - [ ] Display upcoming chats with volunteer name, date, time
  - [ ] Use Card component for each chat
  - [ ] Show empty state if no chats
  - [ ] Quick action buttons (Update Preferences, Find Volunteers)
  - [ ] Profile completeness indicator (optional)
- [ ] Test dashboard with mock scheduled chats
- [ ] Add navigation from all tasks to dashboard

### Error States & Edge Cases
- [ ] Add loading states
  - [ ] Spinner/skeleton screens for data fetching
  - [ ] Loading indicator during API calls
- [ ] Handle "no matches found"
  - [ ] Show helpful message
  - [ ] Suggest updating preferences
- [ ] Offline handling
  - [ ] Detect offline state
  - [ ] Show "Please connect to the internet" message
- [ ] Form validation
  - [ ] Email format validation (LoginPage)
  - [ ] Required fields check
  - [ ] User-friendly error messages
- [ ] Handle empty states
  - [ ] No scheduled chats (DashboardPage)
  - [ ] No preferences set
  - [ ] No interests extracted yet

**Checkpoint:** ✅ Dashboard shows chats, accessibility features work, errors handled

---

## Phase 6: Final Integration & Deployment 

### All Together
- [ ] **End-to-End Testing**
  - [ ] Complete user flow: Login → Preferences → Volunteers → Schedule → AI Interview → Dashboard
  - [ ] Test on Chrome, Firefox, Safari
  - [ ] Test on mobile/tablet (responsive design)
  - [ ] Test with keyboard only (no mouse)
  - [ ] Fix any bugs found

- [ ] **Code Cleanup**
  - [ ] Remove console.logs
  - [ ] Remove unused imports
  - [ ] Add comments where needed
  - [ ] Consistent code formatting

- [ ] **Documentation**
  - [ ] Update README.md with:
    - [ ] Project description
    - [ ] Setup instructions (npm install, .env setup)
    - [ ] How to run (npm run dev:all)
    - [ ] OpenAI API key instructions
    - [ ] Team member contributions
  - [ ] Document known limitations
  - [ ] Add screenshots/demo video (optional)

- [ ] **Deployment**
  - [ ] Build production version: `npm run build`
  - [ ] Deploy frontend to Vercel/Netlify
  - [ ] Deploy backend to Render/Railway (or test locally)
  - [ ] Test deployed version
  - [ ] Share live URL

- [ ] **Demo Preparation**
  - [ ] Prepare test user account
  - [ ] Create demo script showing all 3 tasks
  - [ ] Rehearse presentation
  - [ ] Prepare to explain technical decisions

**Final Checkpoint:** ✅ App deployed, tested, documented, ready to demo!

---

## Optional Enhancements (If Time Permits)

- [ ] Add user profile editing page
- [ ] Add chat rescheduling/cancellation
- [ ] Add post-chat feedback/rating
- [ ] Add volunteer favorites feature
- [ ] Add tutorial/onboarding for first-time users
- [ ] Add animations and transitions
- [ ] Improve error messages with recovery suggestions
- [ ] Add help tooltips throughout app
- [ ] Implement actual video/audio call integration
- [ ] Add email notifications (if using backend service)

---

## Notes & Blockers

**Blocked Items:**
<!-- Use this section to note anything blocking progress -->

**Questions/Decisions:**
<!-- Use this section for team discussion items -->

**Bugs to Fix:**
<!-- Track bugs here as you find them -->
