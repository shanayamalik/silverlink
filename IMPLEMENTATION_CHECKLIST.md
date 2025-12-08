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
- [x] Build `src/components/common/Header.jsx`
  - [x] Props: title, showBack, showHome
  - [x] Navigation buttons with icons (← Back, 🏠 Home)
  - [x] Responsive layout with flexbox
  - [x] User avatar display when logged in

### Mock Data & Utilities
- [x] Populate `src/data/mockVolunteers.js`
  - [x] Create 15 diverse volunteer objects
  - [x] Include: id, name, icon, role, interests, helpsWith, bio, availability, languages, skills, about
  - [x] Culturally diverse profiles with varied backgrounds
- [ ] Implement `src/utils/localStorage.js`
  - [ ] `saveUser(user)` / `getUser()`
  - [ ] `savePreferences(preferences)` / `getPreferences()`
  - [ ] `saveInterests(interests)` / `getInterests()`
  - [ ] `saveScheduledChat(chat)` / `getScheduledChats()`
  - [ ] `clearAllData()`
- [x] Implement `src/utils/matching.js`
  - [x] `matchVolunteers(volunteers, preferences)` function
  - [x] Hard filters: helpNeeded ↔ helpsWith, availability overlap
  - [x] Soft scoring: shared interests, languages, help depth (0-100)
  - [x] `matchVolunteersSoft()` fallback function
  - [x] Filter, sort by score, return top 3 matches

**Checkpoint:** ✅ App runs, pages navigate, components render, mock data loads

---

## Phase 2: Easy Task + Authentication 

### Easy Task - PreferencesPage
- [x] ~~Implement `src/components/HelpTypeTiles.jsx`~~ (DEPRECATED - replaced by AccessibilitySetupPage)
  - [x] Display 3 large tiles: Conversation, Hobby Buddy, Tech Help
  - [x] Use icons from `public/icons/`
  - [x] Highlight selected tile
  - [x] Props: onSelect, selectedType
- [x] ~~Implement `src/components/PreferenceSelector.jsx`~~ (DEPRECATED - replaced by AccessibilitySetupPage)
  - [x] 3 preference options: Communication Style, Location, Age
  - [x] Large toggles or sliders
  - [x] Props: onPreferencesChange, initialPreferences
- [x] **NEW:** Implement `src/pages/AccessibilitySetupPage.jsx` (replaces PreferencesPage)
  - [x] 4-step wizard: Font Size, Color Theme, Input Method, Additional Options
  - [x] Live preview panel showing real-time updates
  - [x] Dark mode support with instant preview
  - [x] Save settings to localStorage
  - [x] Integrated into signup flow: SignUp → Accessibility → Interview → Profile → Dashboard
- [x] Test complete flow with accessibility setup

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
  - [x] Navigate to accessibility setup after signup
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
  - [x] Props: volunteer, onClick, selected, onViewProfile
  - [x] Display icon, name, verified badge (below name)
  - [x] Display profession/role tag
  - [x] Short bio snippet
  - [x] Shared interests as pill tags
  - [x] Small teal "View Profile" button
  - [x] Large, tap-friendly card (Compact Row design)
- [ ] Test with mock volunteer data

### VolunteersPage Integration
- [x] Implement `src/pages/VolunteersPage.jsx`
  - [x] Load user profile from localStorage
  - [x] Filter volunteers using matching algorithm
  - [x] Display top 3 matches (ranked by score)
  - [x] Fall back to soft matching if no hard matches
  - [x] Extended profile modal with full volunteer details
  - [x] "Good news!" banner showing match count
  - [x] Navigate to volunteers after profile confirmation
- [ ] Implement `src/components/VolunteerComparison.jsx` (Optional - current card grid works well)
  - [ ] Props: volunteers (2-3), onSelect, selectedId
  - [ ] Side-by-side layout (responsive: stack on mobile)
- [x] Implement `src/components/SchedulingCalendar.jsx`
  - [x] Props: volunteerId, volunteerName, onSchedule, availableSlots
  - [x] Simple calendar/date picker (week view)
  - [x] Large date buttons (min 50x50px)
  - [x] Time slot options (Morning, Afternoon, Evening)
  - [x] Confirmation button
- [ ] Add backend endpoint: POST /api/chats
- [ ] Add backend endpoint: GET /api/chats/user/:userId
- [x] Test complete Medium Task flow (preferences → volunteers → schedule)

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
- [x] **Optional:** Text-to-Speech (TTS) for AI responses (with on/off toggle)
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
- [x] Implement `src/pages/DashboardPage.jsx`
  - [x] Load scheduled chats from backend/localStorage
  - [x] Display upcoming chats with volunteer name, date, time
  - [x] Use Card component for each chat
  - [x] Show empty state if no chats
  - [x] Quick action buttons (Update Preferences, Find Volunteers)
  - [x] Profile completeness indicator (optional)
  - [x] **Profile Page Polish:** Minimalist design with colorful tag bubbles
  - [x] **Inline Profile Editing:** Edit profile directly within dashboard
  - [x] **Dual Edit Modes:** Manual editing and voice interview re-do option
  - [x] **Interest Selection Modal:** Categorized interest picker
  - [x] **Availability Display:** Clean text + checkbox visualization
  - [x] **Accessibility Button:** Quick access to accessibility settings from profile
  - [ ] **TODO:** First-time user onboarding (minimalist banner/modal design needed)
- [x] Test dashboard with mock scheduled chats
- [x] Add navigation from all tasks to dashboard

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
- [ ] Add post-chat feedback/rating
- [ ] Add volunteer favorites feature
- [ ] Add tutorial/onboarding for first-time users
- [ ] Add help tooltips throughout app

---

## 🎨 Surprising & Delightful Elements (TA Feedback)

Add unexpected touches that make the app memorable and stand out:

### Micro-interactions & Animations
- [ ] Confetti or celebration animation when matched with volunteers
- [ ] Smooth card flip animation when viewing volunteer profiles
- [ ] Gentle pulse animation on microphone during voice interview
- [ ] "Typing indicator" dots when AI is processing response
- [ ] Success checkmark animation after saving profile
- [ ] Floating hearts/stars when selecting interests

### Personality & Warmth
- [ ] Personalized greeting using user's name throughout the app
- [ ] Friendly loading messages ("Finding your perfect match...", "Almost there!")
- [ ] Encouraging messages during voice interview ("Great answer!", "Tell me more!")
- [ ] Fun facts or tips while waiting for AI responses
- [ ] Seasonal themes or greetings (holiday decorations, etc.)

### Unexpected Features
- [ ] "Meet Your Match" reveal animation (like opening an envelope)
- [ ] Sound effects (optional, with toggle) for key actions
- [ ] Easter egg: special response if user says something funny in interview
- [ ] Daily inspiration quote on dashboard
- [ ] Progress celebration milestones ("You've completed your profile!")

### Gamification (Light)
- [ ] Profile completeness meter with encouraging messages
- [ ] "Badges" for completing different sections
- [ ] Streak tracking for regular app usage

---

## ♿ Accessibility Enhancements (TA Feedback)

Ensure the app is usable by everyone, especially seniors with varying abilities:

### Visual Accessibility
- [x] High contrast mode toggle (AccessibilitySetupPage)
- [x] Font size adjustment controls (Small / Medium / Large / Extra Large)
- [ ] Ensure all text meets WCAG AA contrast ratio (4.5:1)
- [ ] Avoid color-only indicators (add icons/text alongside)
- [ ] Clear focus indicators on all interactive elements
- [x] Reduce motion option for users sensitive to animations (AccessibilitySetupPage)

### Screen Reader Support
- [ ] Add proper ARIA labels to all buttons and interactive elements
- [ ] Use semantic HTML (header, main, nav, section, article)
- [ ] Announce dynamic content changes (live regions)
- [ ] Ensure modals trap focus and are properly labeled
- [ ] Test with VoiceOver (Mac) and NVDA (Windows)

### Motor Accessibility
- [x] Ensure all interactive elements are at least 44x44px (large buttons option in AccessibilitySetupPage)
- [ ] Add keyboard shortcuts for common actions
- [ ] Full keyboard navigation support (Tab, Enter, Escape)
- [ ] Skip-to-content link for keyboard users
- [ ] Avoid time-limited interactions

### Cognitive Accessibility
- [x] Simple, clear language throughout
- [x] Consistent navigation and layout
- [ ] Clear error messages with suggestions
- [x] Progress indicators for multi-step processes (AccessibilitySetupPage step counter)
- [x] Undo/back options at every step (AccessibilitySetupPage back button)
- [ ] Memory aids (show previous answers, recap screens)

### Audio Accessibility
- [x] Captions/transcripts for any audio content (live transcript in VoiceInterviewPage)
- [x] Visual feedback for voice recording status (mic button animations)
- [x] Alternative text input option for voice interview (Input Method selector in AccessibilitySetupPage)
- [x] Text-to-Speech toggle (VoiceInterviewPage TTS on/off button)

### Testing
- [ ] Test with actual seniors (user testing)
- [ ] Use Lighthouse accessibility audit
- [ ] Test with browser zoom at 200%
- [ ] Test with system font size increased
- [ ] Verify color blind friendly (use simulator tools)
