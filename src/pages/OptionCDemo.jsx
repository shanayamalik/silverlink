import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OptionCDemo() {
  const [currentView, setCurrentView] = useState('onboarding'); // 'onboarding', 'dashboard', 'preferences'
  const navigate = useNavigate();

  // Mock user data
  const mockUser = {
    name: 'Sarah Johnson',
    profile: {
      bio: 'I love gardening and reading. Looking forward to meeting new friends!',
      interests: ['Gardening', 'Reading', 'Cooking'],
      helpNeeded: ['companionship', 'tech'],
      availability: {
        text: 'Weekdays preferred, mornings work best',
        checks: { Weekdays: true, Mornings: true }
      }
    }
  };

  const renderOnboarding = () => (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '48px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎤</div>
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#1a1a1a' }}>
            Voice Interview
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
            Tell us about yourself through a quick voice conversation. We'll create your profile based on what you share.
          </p>
          
          <div style={{ 
            background: '#f0fdf4', 
            border: '1px solid #86efac',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
              ✨ What happens during the interview:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803d', lineHeight: '1.8' }}>
              <li>We'll ask about your interests and hobbies</li>
              <li>Discuss what kind of help you're looking for</li>
              <li>Learn about your availability</li>
              <li>Create a personalized bio for you</li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              padding: '16px 48px',
              background: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)'
            }}
          >
            Complete Interview → Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '8px' }}>
            Welcome back, {mockUser.name}!
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Your profile was created from your voice interview
          </p>
        </div>

        {/* Profile Card with Update Button */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '2px solid #e0e0e0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', margin: 0, color: '#1a1a1a' }}>Your Profile</h2>
            <button
              onClick={() => setCurrentView('preferences')}
              style={{
                padding: '10px 20px',
                background: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
              }}
            >
              <span>⚙️</span>
              Update Preferences
            </button>
          </div>

          {/* Profile Content */}
          <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '16px' }}>
              <strong>About:</strong> {mockUser.profile.bio}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Interests:</strong>{' '}
              {mockUser.profile.interests.map((int, i) => (
                <span key={i} style={{
                  background: '#E0F2FE',
                  color: '#0369A1',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  marginRight: '8px',
                  fontSize: '13px'
                }}>
                  {int}
                </span>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Looking for help with:</strong> Companionship, Tech Support
            </div>
            <div>
              <strong>Availability:</strong> {mockUser.profile.availability.text}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          color: '#92400e'
        }}>
          💡 <strong>Tip:</strong> Want to change what kind of help you're looking for or your communication preferences? Click "Update Preferences" above to make quick edits.
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ fontSize: '28px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
            Update Your Preferences
          </h1>
          <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
            Fine-tune what you're looking for
          </p>
        </div>

        {/* Carrie's Manual Preferences UI */}
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '32px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Help Type Selection */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>
              What are you looking for?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {['Someone to Talk To', 'Hobby Buddy', 'Tech Help'].map((type, i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    border: i === 0 ? '2px solid #4F46E5' : '2px solid #e0e0e0',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: i === 0 ? '#f5f3ff' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                    {i === 0 ? '💬' : i === 1 ? '🎨' : '📱'}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
                    {type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>
              Communication Style
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Listener', 'Balanced', 'Talkative'].map((style, i) => (
                <button
                  key={i}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: i === 1 ? '2px solid #4F46E5' : '2px solid #e0e0e0',
                    borderRadius: '8px',
                    background: i === 1 ? '#f5f3ff' : 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Quick Toggle */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>
              Availability
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Weekends', 'Weekdays', 'Mornings', 'Afternoons', 'Evenings'].map((time, i) => (
                <label
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    background: i === 1 || i === 2 ? '#f0f0f0' : 'white',
                    fontSize: '14px'
                  }}
                >
                  <input type="checkbox" checked={i === 1 || i === 2} readOnly />
                  {time}
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                flex: 1,
                padding: '14px',
                background: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                padding: '14px 24px',
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Note */}
        <div style={{
          marginTop: '24px',
          background: '#e0f2fe',
          border: '1px solid #bae6fd',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          color: '#0c4a6e'
        }}>
          ℹ️ <strong>Note:</strong> These preferences will be used to find better volunteer matches for you. Your original profile from the voice interview stays intact.
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* View Switcher (for demo purposes) */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000
      }}>
        <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: '600' }}>
          DEMO NAVIGATION
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setCurrentView('onboarding')}
            style={{
              padding: '8px 16px',
              background: currentView === 'onboarding' ? '#4F46E5' : '#f0f0f0',
              color: currentView === 'onboarding' ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            1. Voice Interview
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              padding: '8px 16px',
              background: currentView === 'dashboard' ? '#4F46E5' : '#f0f0f0',
              color: currentView === 'dashboard' ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            2. Dashboard
          </button>
          <button
            onClick={() => setCurrentView('preferences')}
            style={{
              padding: '8px 16px',
              background: currentView === 'preferences' ? '#4F46E5' : '#f0f0f0',
              color: currentView === 'preferences' ? 'white' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            3. Update Preferences
          </button>
        </div>
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e0e0e0' }}>
          <button
            onClick={() => navigate('/merge-decision')}
            style={{
              width: '100%',
              padding: '8px',
              background: 'transparent',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ← Back to Options
          </button>
        </div>
      </div>

      {/* Current View */}
      {currentView === 'onboarding' && renderOnboarding()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'preferences' && renderPreferences()}
    </div>
  );
}
