import { useState } from 'react';

// Carrie's actual PreferencesPage implementation
function CarriesPreferencesPage() {
  const [helpType, setHelpType] = useState("");
  const [preferences, setPreferences] = useState({
    communicationStyle: "Balanced",
    location: "No Preference",
    agePreference: "Any Age"
  });

  const handleSave = async () => {
    const data = { helpType, ...preferences };
    localStorage.setItem("preferences", JSON.stringify(data));
    alert("Preferences saved! In the real app, this would navigate to /volunteers");
  };

  const handleBackToTiles = () => {
    setHelpType("");
  };

  // Inline HelpTypeTiles
  const HelpTypeTiles = ({ onSelect, selectedType }) => {
    const OPTIONS = ["Someone to Talk To", "Hobby Buddy", "Tech Help"];
    
    return (
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px' }}>
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            style={{
              padding: '48px 32px',
              fontSize: '18px',
              fontWeight: '600',
              border: selectedType === opt ? '3px solid #4CAF50' : '2px solid #ddd',
              borderRadius: '12px',
              backgroundColor: selectedType === opt ? '#e8f5e9' : 'white',
              cursor: 'pointer',
              minWidth: '180px',
              transition: 'all 0.2s',
              boxShadow: selectedType === opt ? '0 4px 12px rgba(76, 175, 80, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  // Inline PreferenceSelector
  const PreferenceSelector = ({ onPreferencesChange, initialPreferences }) => {
    const [localPrefs, setLocalPrefs] = useState(initialPreferences);

    const handleChange = (category, value) => {
      const updated = { ...localPrefs, [category]: value };
      setLocalPrefs(updated);
      onPreferencesChange(updated);
    };

    const renderSlider = (category, label, options) => {
      const currentValue = localPrefs[category];
      return (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            {label}
          </h3>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleChange(category, option)}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  border: currentValue === option ? '2px solid #2196F3' : '2px solid #ddd',
                  borderRadius: '24px',
                  backgroundColor: currentValue === option ? '#2196F3' : 'white',
                  color: currentValue === option ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: currentValue === option ? '600' : '400',
                  transition: 'all 0.2s',
                  minWidth: '120px'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div>
        {renderSlider("communicationStyle", "Communication Style", ["Listener", "Balanced", "Talkative"])}
        {renderSlider("location", "Location", ["Nearby", "No Preference", "Online"])}
        {renderSlider("agePreference", "Age Preference", ["Similar Age", "Any Age"])}
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#333', 
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Preferences
        </h1>

        {!helpType ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                What are you looking for today?
              </h2>
              <p style={{ fontSize: '16px', color: '#666' }}>
                Please pick one of the options below to continue.
              </p>
            </div>
            <HelpTypeTiles onSelect={setHelpType} selectedType={helpType} />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <button 
                onClick={handleBackToTiles}
                style={{
                  backgroundColor: '#2d2c2c',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  marginBottom: '24px'
                }}
              >
                ← Back
              </button>

              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                  Set your preferences
                </h2>
                <p style={{ fontSize: '16px', color: '#666' }}>
                  Adjust the options below to match your style.
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#fafafa',
              padding: '32px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <PreferenceSelector
                onPreferencesChange={setPreferences}
                initialPreferences={preferences}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '14px 48px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main demo page with code viewer
export default function CarrieLiveDemo() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      {/* Toggle button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '12px'
      }}>
        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {showCode ? 'Hide Code' : 'View Code'}
        </button>
        <a href="/merge-decision" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#666',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Back to Options
          </button>
        </a>
      </div>

      {/* Split view */}
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Live preview */}
        <div style={{ 
          flex: showCode ? '1' : '1',
          overflow: 'auto',
          transition: 'all 0.3s'
        }}>
          <CarriesPreferencesPage />
        </div>

        {/* Code viewer */}
        {showCode && (
          <div style={{
            flex: '1',
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: '20px',
            overflow: 'auto',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '13px',
            lineHeight: '1.6'
          }}>
            <h2 style={{ color: '#4EC9B0', marginBottom: '20px' }}>Carrie&apos;s PreferencesPage.jsx</h2>
            
            <h3 style={{ color: '#DCDCAA', marginBottom: '16px' }}>Key Features:</h3>
            <ul style={{ color: '#d4d4d4', lineHeight: '2', marginBottom: '32px' }}>
              <li><strong>Two-step flow:</strong> First select help type, then set preferences</li>
              <li><strong>HelpTypeTiles:</strong> 3 large clickable tiles for &quot;Someone to Talk To&quot;, &quot;Hobby Buddy&quot;, &quot;Tech Help&quot;</li>
              <li><strong>PreferenceSelector:</strong> Slider-style buttons for:
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Communication Style: Listener / Balanced / Talkative</li>
                  <li>Location: Nearby / No Preference / Online</li>
                  <li>Age Preference: Similar Age / Any Age</li>
                </ul>
              </li>
              <li><strong>Data persistence:</strong> Saves to localStorage AND makes PUT request to /api/users/:id/preferences</li>
              <li><strong>Navigation:</strong> After saving, routes to /volunteers page</li>
              <li><strong>Back button:</strong> Can go back from preferences to help type selection</li>
            </ul>

            <h3 style={{ color: '#DCDCAA', marginBottom: '16px' }}>Integration Notes:</h3>
            <ul style={{ color: '#d4d4d4', lineHeight: '2' }}>
              <li>✅ Clean, focused UI for preference collection</li>
              <li>✅ Reusable components (HelpTypeTiles, PreferenceSelector)</li>
              <li>✅ Good UX with two-step process and back navigation</li>
              <li>⚠️ Overlaps with Voice Interview for initial onboarding</li>
              <li>💡 Perfect for &quot;Update Preferences&quot; feature in dashboard (Option C)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
