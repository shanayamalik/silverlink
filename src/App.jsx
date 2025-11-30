import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PreferencesPage from './pages/PreferencesPage';
import VolunteersPage from './pages/VolunteersPage';
import DesignPreviewPage from './pages/DesignPreviewPage';
import ProfileDesignPreview from './pages/ProfileDesignPreview';
import VoiceInterviewPage from './pages/VoiceInterviewPage';
import './styles/global.css';
import './App.css';

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
          <Route path="/design-preview" element={<DesignPreviewPage />} />
          <Route path="/profile-design" element={<ProfileDesignPreview />} />
          <Route path="/interview" element={<VoiceInterviewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


