import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PreferencesPage from './pages/PreferencesPage';
import DashboardPage from './pages/DashboardPage';
import VolunteersPage from './pages/VolunteersPage';
import VoiceInterviewPage from './pages/VoiceInterviewPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import ChatPage from './pages/ChatPage';
import ButtonDesignOptions from './pages/ButtonDesignOptions';
import CardLayoutOptions from './pages/CardLayoutOptions';
import BannerDesignOptions from './pages/BannerDesignOptions';
import BadgeDesignOptions from './pages/BadgeDesignOptions';
import ProfileDesignOptions2 from './pages/ProfileDesignOptions2';
import MergeDecisionPage from './pages/MergeDecisionPage';
import OptionCDemo from './pages/OptionCDemo';
import CarrieLiveDemo from './pages/CarrieLiveDemo';
import ProfileWithPreferencesDemo from './pages/ProfileWithPreferencesDemo';
import AccessibilitySetupPage from './pages/AccessibilitySetupPage';
import SchedulingCalendar from "./components/SchedulingCalendar";
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          {/*  SchedulingCalendar */}
          <Route
            path="/test-calendar"
            element={
              <SchedulingCalendar
                volunteerId={999}
                volunteerName="Test Volunteer"
                availableSlots={[
                  { date: "2025-11-25", time: "10:00 AM", duration: 30 },
                  { date: "2025-11-25", time: "2:00 PM", duration: 30 },
                  { date: "2025-11-26", time: "6:00 PM", duration: 30 },
                ]}
                onSchedule={(slot) => console.log("Scheduled slot:", slot)}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recover-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/interview" element={<VoiceInterviewPage />} />
          <Route path="/profile-creation" element={<ProfileCreationPage />} />
          <Route path="/chat/:volunteerId" element={<ChatPage />} />
          <Route path="/button-designs" element={<ButtonDesignOptions />} />
          <Route path="/card-layouts" element={<CardLayoutOptions />} />
          <Route path="/banner-designs" element={<BannerDesignOptions />} />
          <Route path="/badge-designs" element={<BadgeDesignOptions />} />
          <Route path="/profile-designs" element={<ProfileDesignOptions2 />} />
          <Route path="/merge-decision" element={<MergeDecisionPage />} />
          <Route path="/option-c-demo" element={<OptionCDemo />} />
          <Route path="/carrie-demo" element={<CarrieLiveDemo />} />
          <Route path="/preferences-demo" element={<ProfileWithPreferencesDemo />} />
          <Route path="/accessibility-setup" element={<AccessibilitySetupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


