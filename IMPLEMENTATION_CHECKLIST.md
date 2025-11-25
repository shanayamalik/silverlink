# SilverGuide - Implementation Checklist

Track your progress as you build the app! Check off items as you complete them.

---

## Phase 1: Foundation (Days 1-2) - MUST DO FIRST

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

## Phase 2: Easy Task + Authentication (Days 3-4)

### Easy Task - PreferencesPage
- [x] Implement `src/components/HelpTypeTiles.jsx`
  - [x] Display 3 large tiles: Conversation, Hobby Buddy, Tech Help
  - [x] Use icons from `public/icons/`
  - [x] Highlight selected tile
  - [x] Props: onSelect, selectedType
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
- [ ] Implement `src/pages/LoginPage.jsx`
  - [ ] Email and password input fields (large, accessible)
  - [ ] "Log In" button
  - [ ] Save user to localStorage on login
  - [ ] Navigate to /home after login
  - [ ] (Optional) Simple validation
- [x] Implement `src/pages/HomePage.jsx`
  - [x] Welcome message with user's name
  - [ ] 3 large action buttons:
    - [ ] "Set My Preferences" → /preferences
    - [ ] "Find Volunteers" → /volunteers
    - [ ] "AI Interview" → /interview
  - [ ] Use Header component (no back button)
- [ ] Test login → home → navigation flow

### Backend Setup
- [x] Implement `server/index.js`
  - [x] Set up Express with cors and body-parser
  - [x] In-memory storage (users array, chats array)
  - [ ] POST /api/auth/register endpoint
  - [ ] POST /api/auth/login endpoint
  - [ ] PUT /api/users/:id/preferences endpoint
  - [ ] GET /api/users/:id endpoint
- [ ] Test backend with Postman/Thunder Client
- [x] Run server with `npm run server`
- [ ] Test frontend calling backend APIs

**Checkpoint:** ✅ User can log in, set preferences, save to backend

---

## Phase 3: Medium Task - VolunteersPage (Days 5-7)

### Person 1: Volunteer Display Components
- [x] Implement `src/components/VolunteerCard.jsx`
  - [x] Props: volunteer, onClick, selected, compact
  - [x] Display photo/icon, name, verified badge
  - [x] Display profession/role tag (instead of location)
  - [x] "Can help with" section
  - [x] Dynamic button text ("Chat with..." vs "Request Help") based on context
  - [x] Large, tap-friendly card (Border variant)
- [x] Implement `src/components/VolunteerComparison.jsx`
  - [x] Props: volunteers (2-3), onSelect, selectedId
  - [x] Side-by-side layout (responsive: stack on mobile)
  - [x] Use VolunteerCard with compact prop
  - [x] "Select" button on each card
- [x] Test with mock volunteer data

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

## Phase 4: Difficult Task - AI Voice Interview (Days 8-10)

### Voice Recognition Core
- [ ] Implement `src/components/VoiceInterview.jsx` (main component)
  - [ ] Large microphone button (use microphone.svg)
  - [ ] Integrate Web Speech API (SpeechRecognition)
  - [ ] Start/stop recording functionality
  - [ ] State: isListening, transcript, conversationHistory
  - [ ] Text input fallback option
  - [ ] Progress indicator
- [ ] Test voice recording and transcription
- [ ] Handle browser compatibility (webkit prefix)

### Live Display Components
- [ ] Implement `src/components/LiveTranscription.jsx`
  - [ ] Props: transcript (array), isListening
  - [ ] Display real-time speech-to-text
  - [ ] Color coding by confidence: green (>0.8), yellow (0.5-0.8), red (<0.5)
  - [ ] Auto-scroll to latest
  - [ ] Different styling for user vs AI speech
- [ ] Implement `src/components/ProfileTagsLive.jsx`
  - [ ] Props: tags (array), onRemove
  - [ ] Display extracted preferences as tags
  - [ ] Animate new tags (fade-in)
  - [ ] Group by category: interests, communication, availability
  - [ ] Color-code by category
- [ ] Test live updates and animations

### AI Integration & Error Handling
- [ ] Implement `src/components/ErrorRecovery.jsx`
  - [ ] Props: errorType, originalText, suggestions, onCorrect, onSkip
  - [ ] "Did you mean...?" interface
  - [ ] Display original text + suggestions
  - [ ] Undo/retry options
  - [ ] Text input fallback
- [ ] Add OpenAI integration in `server/index.js`
  - [ ] Install openai package
  - [ ] POST /api/ai/chat endpoint
  - [ ] Send user message + conversation history to OpenAI
  - [ ] Extract interests/preferences from AI response
  - [ ] Return AI question + extracted data
- [ ] Add backend endpoint: PUT /api/users/:id/interests
- [ ] Test AI conversation flow

### Integration & Testing
- [ ] Integrate all voice components in VoiceInterviewPage
- [ ] Implement `src/pages/VoiceInterviewPage.jsx`
  - [ ] Use VoiceInterview component
  - [ ] Handle completion (save interests to backend)
  - [ ] Navigate to /home or summary screen
- [ ] Test full AI interview flow:
  - [ ] Start interview
  - [ ] Speak or type responses
  - [ ] See live transcription
  - [ ] See tags appear in real-time
  - [ ] Handle errors/corrections
  - [ ] Complete and save interests
- [ ] Test without OpenAI API (mock responses) as fallback

**Checkpoint:** ✅ AI voice interview works, extracts interests, updates profile

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

### Accessibility Features
- [ ] Add text size controls (A / A+)
  - [ ] Toggle buttons to increase/decrease font size
  - [ ] Save preference to localStorage
  - [ ] Apply to entire app
- [ ] Implement high contrast mode toggle
  - [ ] Add [data-theme="high-contrast"] styles in variables.css
  - [ ] Toggle button in header or settings
- [ ] Accessibility audit:
  - [ ] Test keyboard navigation (Tab, Enter, Escape)
  - [ ] Verify all interactive elements are focusable
  - [ ] Check ARIA labels on all buttons/inputs
  - [ ] Test with screen reader (VoiceOver/NVDA)
  - [ ] Verify color contrast ratios (WCAG AA)

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

## Phase 6: Final Integration & Deployment (Days 13-14)

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
