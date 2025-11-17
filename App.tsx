import React, { useState, useEffect, useCallback } from 'react';
import { User, UserProfile } from './types';
import { authService } from './services/authService';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ChatView from './views/ChatView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [view, setView] = useState<'login' | 'signup' | 'chat' | 'profile'>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const sessionUser = authService.getCurrentUser();
      if (sessionUser) {
        const profile = authService.getProfile(sessionUser.id);
        setCurrentUser(sessionUser);
        setUserProfile(profile);
        setView('chat');
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const handleLogin = (user: User) => {
    const profile = authService.getProfile(user.id);
    setCurrentUser(user);
    setUserProfile(profile);
    if (!profile?.name) {
      setView('profile'); // New user, prompt for profile info
    } else {
      setView('chat');
    }
  };

  const handleSignup = (user: User) => {
    // Automatically log in the new user and direct to profile creation
    setCurrentUser(user);
    setUserProfile({ userId: user.id, name: '', interests: '' }); // Initialize empty profile
    setView('profile');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setUserProfile(null);
    setView('login');
  };

  const handleSaveProfile = (profile: UserProfile) => {
    authService.saveProfile(profile);
    setUserProfile(profile);
    setView('chat');
  };

  const navigateTo = (targetView: 'login' | 'signup' | 'chat' | 'profile') => {
    setView(targetView);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-blue-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      {!currentUser ? (
        <>
          {view === 'login' && <Login onLogin={handleLogin} onNavigate={() => navigateTo('signup')} />}
          {view === 'signup' && <Signup onSignup={handleSignup} onNavigate={() => navigateTo('login')} />}
        </>
      ) : (
        <>
          {view === 'chat' && userProfile && (
            <ChatView userProfile={userProfile} onLogout={handleLogout} onNavigateToProfile={() => navigateTo('profile')} />
          )}
          {view === 'profile' && userProfile && (
            <Profile profile={userProfile} onSave={handleSaveProfile} onBack={() => navigateTo('chat')} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
