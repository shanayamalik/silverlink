import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PreferencesPage from './pages/PreferencesPage';
import VolunteersPage from './pages/VolunteersPage';
import VoiceInterviewPage from './pages/VoiceInterviewPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import ButtonDesignOptions from './pages/ButtonDesignOptions';
import CardLayoutOptions from './pages/CardLayoutOptions';
import BannerDesignOptions from './pages/BannerDesignOptions';
import BadgeDesignOptions from './pages/BadgeDesignOptions';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recover-password" element={<ForgotPasswordPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/volunteers" element={<VolunteersPage />} />
          <Route path="/interview" element={<VoiceInterviewPage />} />
          <Route path="/profile-creation" element={<ProfileCreationPage />} />
          <Route path="/button-designs" element={<ButtonDesignOptions />} />
          <Route path="/card-layouts" element={<CardLayoutOptions />} />
          <Route path="/banner-designs" element={<BannerDesignOptions />} />
          <Route path="/badge-designs" element={<BadgeDesignOptions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


