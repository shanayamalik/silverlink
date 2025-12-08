import { useState } from 'react';

export default function ProfileWithPreferencesDemo() {
  const [view, setView] = useState('integrated'); // 'integrated' or 'alternative'
  const [isEditMode, setIsEditMode] = useState(true);
  const [preferences, setPreferences] = useState({
    communicationStyle: "Balanced",
    location: "No Preference",
    agePreference: "Any Age"
  });

  // Mock user data
  const mockUser = {
    name: "Dorothy Martinez",
    age: 68,
    bio: "Retired teacher who loves gardening and reading mystery novels.",
    interests: ["Gardening", "Reading", "Cooking", "Photography"],
    helpNeeded: ["Companionship", "Tech Support"],
    availability: {
      text: "Weekday afternoons work best for me",
      checks: { weekdays: true, afternoons: true }
    }
  };

  const renderPreferenceSlider = (category, label, options) => {
    const currentValue = preferences[category];
    return (
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ 
          marginBottom: '12px', 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#555',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setPreferences(prev => ({ ...prev, [category]: option }))}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                border: currentValue === option ? '2px solid #2196F3' : '2px solid #ddd',
                borderRadius: '20px',
                backgroundColor: currentValue === option ? '#2196F3' : 'white',
                color: currentValue === option ? 'white' : '#666',
                cursor: 'pointer',
                fontWeight: currentValue === option ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444'];

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Toggle between views */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto 32px',
        display: 'flex',
        gap: '12px',
        backgroundColor: 'white',
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setView('integrated')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: view === 'integrated' ? '#2196F3' : 'transparent',
            color: view === 'integrated' ? 'white' : '#666',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Option 1: Integrate into Profile
        </button>
        <button
          onClick={() => setView('alternative')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: view === 'alternative' ? '#2196F3' : 'transparent',
            color: view === 'alternative' ? 'white' : '#666',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Option 2: Alternative Idea
        </button>
      </div>

      {view === 'integrated' ? (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>Profile</h2>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              style={{
                padding: '8px 20px',
                backgroundColor: isEditMode ? '#10B981' : '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {isEditMode ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          {/* Basic Info */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
              {mockUser.name}, {mockUser.age}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
              {mockUser.bio}
            </div>
          </div>

          {/* Interests */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Interests
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {mockUser.interests.map((interest, idx) => (
                <span
                  key={interest}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: colors[idx % colors.length] + '15',
                    color: colors[idx % colors.length],
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: `1px solid ${colors[idx % colors.length]}30`
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Help Needed */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Looking For
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {mockUser.helpNeeded.map((help, idx) => (
                <span
                  key={help}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: colors[idx % colors.length] + '15',
                    color: colors[idx % colors.length],
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '500',
                    border: `1px solid ${colors[idx % colors.length]}30`
                  }}
                >
                  {help}
                </span>
              ))}
            </div>
          </div>

          {/* NEW: Carrie's Preferences Section */}
          {isEditMode && (
            <div style={{
              marginTop: '32px',
              paddingTop: '32px',
              borderTop: '2px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#333', 
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>Volunteer Preferences</span>
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  COSMETIC ONLY
                </span>
              </div>
              
              <div style={{
                backgroundColor: '#fafafa',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '16px'
              }}>
                {renderPreferenceSlider("communicationStyle", "Communication Style", ["Listener", "Balanced", "Talkative"])}
                {renderPreferenceSlider("location", "Location Preference", ["Nearby", "No Preference", "Online"])}
                {renderPreferenceSlider("agePreference", "Age Preference", ["Similar Age", "Any Age"])}
              </div>

              <div style={{
                backgroundColor: '#FFF3CD',
                border: '1px solid #FFE69C',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13px',
                color: '#856404'
              }}>
                ⚠️ <strong>Note:</strong> These preferences are shown in your profile but don't affect volunteer matching. 
                Matching is based on: Help Needed, Interests, Languages, and Availability.
              </div>
            </div>
          )}

          {/* Display preferences when not editing */}
          {!isEditMode && (
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Preferences
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#555' }}>
                <span>🗣️ {preferences.communicationStyle}</span>
                <span>•</span>
                <span>📍 {preferences.location}</span>
                <span>•</span>
                <span>👥 {preferences.agePreference}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '16px' }}>
            Alternative: First-Time Setup Wizard
          </h2>
          
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
            Instead of integrating into the profile, use Carrie's UI as a <strong>one-time setup wizard</strong> that appears 
            right after the voice interview but BEFORE the dashboard.
          </p>

          <div style={{ backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              New User Flow:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#2196F3', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>1</div>
                <span style={{ fontSize: '15px', color: '#333' }}>Sign Up</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#2196F3', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>2</div>
                <span style={{ fontSize: '15px', color: '#333' }}>Voice Interview (tells us about you)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#10B981', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>3</div>
                <span style={{ fontSize: '15px', color: '#333', fontWeight: '600' }}>
                  <strong>NEW:</strong> Quick Setup Questions (Carrie's UI)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: '#2196F3', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>4</div>
                <span style={{ fontSize: '15px', color: '#333' }}>Dashboard</span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            What could the setup questions ask?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#E8F5E9', padding: '16px', borderRadius: '8px', border: '1px solid #C8E6C9' }}>
              <div style={{ fontWeight: '600', color: '#2E7D32', marginBottom: '8px' }}>✅ Option A: Notification Preferences</div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                • How do you want to be notified? (Email, SMS, In-app only)<br/>
                • Reminder frequency for scheduled chats?<br/>
                • Email digest preferences (daily, weekly, never)
              </div>
            </div>

            <div style={{ backgroundColor: '#E3F2FD', padding: '16px', borderRadius: '8px', border: '1px solid #BBDEFB' }}>
              <div style={{ fontWeight: '600', color: '#1565C0', marginBottom: '8px' }}>✅ Option B: Accessibility Setup</div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                • Text size preference (Small, Medium, Large, Extra Large)<br/>
                • High contrast mode?<br/>
                • Screen reader compatibility check
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF3E0', padding: '16px', borderRadius: '8px', border: '1px solid #FFE0B2' }}>
              <div style={{ fontWeight: '600', color: '#E65100', marginBottom: '8px' }}>✅ Option C: Chat Preferences</div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                • Preferred chat length (15 min, 30 min, 1 hour, Flexible)<br/>
                • Video or voice only?<br/>
                • Want to record sessions for review?
              </div>
            </div>

            <div style={{ backgroundColor: '#F3E5F5', padding: '16px', borderRadius: '8px', border: '1px solid #E1BEE7' }}>
              <div style={{ fontWeight: '600', color: '#6A1B9A', marginBottom: '8px' }}>⚠️ Option D: Volunteer Preferences (Current)</div>
              <div style={{ fontSize: '14px', color: '#555' }}>
                • Communication style, Location, Age preference<br/>
                <span style={{ color: '#C62828', fontSize: '13px' }}>Problem: These don't affect matching, so they're misleading</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '32px',
            backgroundColor: '#E8F5E9',
            border: '2px solid #66BB6A',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ fontWeight: '700', color: '#2E7D32', marginBottom: '12px', fontSize: '16px' }}>
              💡 My Recommendation:
            </div>
            <div style={{ fontSize: '14px', color: '#1B5E20', lineHeight: '1.6' }}>
              Use Carrie's UI for <strong>Accessibility Setup</strong>. This would:<br/>
              • Actually improve the app experience<br/>
              • Not mislead users about matching<br/>
              • Give Carrie's work real purpose<br/>
              • Be a unique, thoughtful feature for seniors
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
