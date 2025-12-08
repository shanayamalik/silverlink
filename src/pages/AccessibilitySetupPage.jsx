import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AccessibilitySetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const analysisData = location.state?.analysisData || null;
  const [step, setStep] = useState(1); // 1: Font Size, 2: Color Theme, 3: Input Method, 4: Other Options
  const [settings, setSettings] = useState({
    fontSize: 'Medium',
    colorTheme: 'Light',
    inputMethod: 'Both',
    reduceMotion: false,
    highContrast: false,
    textToSpeech: true,
    largeButtons: true
  });

  const handleSave = () => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    // If coming from interview (has analysisData), go to profile creation
    // Otherwise, go to interview (coming from signup)
    if (analysisData) {
      navigate('/profile-creation', { state: { analysisData } });
    } else {
      navigate('/interview');
    }
  };

  const handleSkip = () => {
    // If coming from interview, pass data to profile creation
    // Otherwise, go to interview (coming from signup)
    if (analysisData) {
      navigate('/profile-creation', { state: { analysisData } });
    } else {
      navigate('/interview');
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const isDark = settings.colorTheme === 'Dark';
  const textColor = isDark ? '#ffffff' : '#333';
  const mutedColor = isDark ? '#b0b0b0' : '#666';
  const bgColor = isDark ? '#2d2d2d' : 'white';
  const surfaceColor = isDark ? '#1f1f1f' : '#f8f9fa';

  // Font size preview component
  const FontSizeOption = ({ size, label }) => {
    const isSelected = settings.fontSize === size;
    const fontSizeMap = {
      'Small': '14px',
      'Medium': '16px',
      'Large': '18px',
      'Extra Large': '22px'
    };
    
    return (
      <button
        onClick={() => updateSetting('fontSize', size)}
        style={{
          flex: 1,
          minWidth: '150px',
          padding: '24px 20px',
          border: isSelected ? '3px solid #2196F3' : `2px solid ${isDark ? '#444' : '#ddd'}`,
          borderRadius: '16px',
          backgroundColor: isSelected ? (isDark ? '#1e3a5f' : '#E3F2FD') : bgColor,
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: isSelected ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div style={{
          fontSize: fontSizeMap[size],
          fontWeight: '600',
          color: textColor
        }}>
          Aa
        </div>
        <div style={{
          fontSize: '13px',
          color: mutedColor,
          fontWeight: isSelected ? '600' : '400'
        }}>
          {label}
        </div>
      </button>
    );
  };

  // Color theme option component
  const ColorThemeOption = ({ theme, label, previewBg, previewText }) => {
    const isSelected = settings.colorTheme === theme;
    
    return (
      <button
        onClick={() => updateSetting('colorTheme', theme)}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '0',
          border: isSelected ? '3px solid #2196F3' : `2px solid ${isDark ? '#444' : '#ddd'}`,
          borderRadius: '16px',
          backgroundColor: bgColor,
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: isSelected ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Preview area */}
        <div style={{
          backgroundColor: previewBg,
          color: previewText,
          padding: '32px 24px',
          borderBottom: isSelected ? '3px solid #2196F3' : `2px solid ${isDark ? '#444' : '#ddd'}`
        }}>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Preview
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            This is how text will look
          </div>
        </div>
        
        {/* Label area */}
        <div style={{
          padding: '16px',
          fontSize: '14px',
          fontWeight: isSelected ? '600' : '400',
          color: textColor
        }}>
          {label}
        </div>
      </button>
    );
  };

  // Input method option (Carrie's tile style)
  const InputMethodOption = ({ method, emoji, label, description }) => {
    const isSelected = settings.inputMethod === method;
    
    return (
      <button
        onClick={() => updateSetting('inputMethod', method)}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '24px',
          border: isSelected ? '3px solid #2196F3' : `2px solid ${isDark ? '#444' : '#ddd'}`,
          borderRadius: '16px',
          backgroundColor: isSelected ? (isDark ? '#1e3a5f' : '#E3F2FD') : bgColor,
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: isSelected ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{emoji}</div>
        <div style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
          {label}
        </div>
        <div style={{ fontSize: '13px', color: mutedColor, lineHeight: '1.4' }}>
          {description}
        </div>
      </button>
    );
  };

  // Toggle option component
  const ToggleOption = ({ setting, label, description }) => {
    const isEnabled = settings[setting];
    
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: surfaceColor,
        borderRadius: '12px',
        border: `2px solid ${isDark ? '#444' : '#f0f0f0'}`,
        marginBottom: '16px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ fontSize: '14px', color: mutedColor }}>
            {description}
          </div>
        </div>
        
        <button
          onClick={() => updateSetting(setting, !isEnabled)}
          style={{
            width: '60px',
            height: '32px',
            borderRadius: '16px',
            backgroundColor: isEnabled ? '#4CAF50' : (isDark ? '#444' : '#ddd'),
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.3s'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            top: '4px',
            left: isEnabled ? '32px' : '4px',
            transition: 'all 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        </button>
      </div>
    );
  };

  const fontSizeMap = {
    'Small': '14px',
    'Medium': '16px',
    'Large': '18px',
    'Extra Large': '22px'
  };

  return (
    <div style={{
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      gap: '24px',
      justifyContent: 'center',
      transition: 'background-color 0.3s'
    }}>
      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s, color 0.3s'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: textColor, marginBottom: '8px' }}>
            Accessibility Setup
          </h1>
          <p style={{ fontSize: '16px', color: mutedColor }}>
            Customize SilverGuide to work best for you
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {[1, 2, 3, 4].map(num => (
            <div
              key={num}
              style={{
                width: '40px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: num <= step ? '#2196F3' : (isDark ? '#444' : '#e0e0e0'),
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Step 1: Font Size */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
                Choose Your Text Size
              </h2>
              <p style={{ fontSize: '15px', color: mutedColor }}>
                Select the text size that's most comfortable for you to read
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <FontSizeOption size="Small" label="Small" />
              <FontSizeOption size="Medium" label="Medium (Default)" />
              <FontSizeOption size="Large" label="Large" />
              <FontSizeOption size="Extra Large" label="Extra Large" />
            </div>

            {/* Preview */}
            <div style={{
              backgroundColor: surfaceColor,
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: mutedColor, marginBottom: '12px', textTransform: 'uppercase' }}>
                Preview
              </div>
              <div style={{ fontSize: fontSizeMap[settings.fontSize], color: textColor, lineHeight: '1.6' }}>
                This is how text will appear throughout SilverGuide with your selected size. 
                You can change this anytime in your settings.
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Color Theme */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
                Choose Your Color Theme
              </h2>
              <p style={{ fontSize: '15px', color: mutedColor }}>
                Pick the color scheme that's easiest on your eyes
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <ColorThemeOption 
                theme="Light" 
                label="Light Theme (Default)"
                previewBg="#ffffff"
                previewText="#333333"
              />
              <ColorThemeOption 
                theme="Dark" 
                label="Dark Theme"
                previewBg="#1a1a1a"
                previewText="#ffffff"
              />
            </div>

            <div style={{
              backgroundColor: isDark ? '#1e3a1e' : '#E8F5E9',
              border: `1px solid ${isDark ? '#2d5f2d' : '#C8E6C9'}`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '14px', color: isDark ? '#81c784' : '#2E7D32', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>💡</span>
                <div>
                  <strong>Tip:</strong> Dark theme can reduce eye strain in low-light environments, 
                  while light theme works better in bright settings. Try switching based on time of day!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Input Method */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
                How Would You Like to Communicate?
              </h2>
              <p style={{ fontSize: '15px', color: mutedColor }}>
                Choose your preferred way to interact with volunteers
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <InputMethodOption
                method="Voice"
                emoji="🎙️"
                label="Voice Only"
                description="I prefer speaking and listening"
              />
              <InputMethodOption
                method="Text"
                emoji="⌨️"
                label="Text Only"
                description="I prefer typing and reading"
              />
              <InputMethodOption
                method="Both"
                emoji="💬"
                label="Both (Default)"
                description="I'm comfortable with either"
              />
            </div>

            <div style={{
              backgroundColor: isDark ? '#2d1f1f' : '#FFF3E0',
              border: `1px solid ${isDark ? '#5f3d2d' : '#FFE0B2'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '14px', color: isDark ? '#ffb74d' : '#E65100', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>ℹ️</span>
                <div>
                  This helps us show you the best volunteers for your communication style. 
                  You can still use any method you'd like during chats!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Additional Options */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
                Additional Accessibility Options
              </h2>
              <p style={{ fontSize: '15px', color: mutedColor }}>
                Enable features that make SilverGuide easier to use
              </p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <ToggleOption
                setting="highContrast"
                label="High Contrast Mode"
                description="Increases contrast between text and background for better readability"
              />
              
              <ToggleOption
                setting="textToSpeech"
                label="Text-to-Speech"
                description="Have AI messages read aloud automatically during interviews"
              />
              
              <ToggleOption
                setting="reduceMotion"
                label="Reduce Motion"
                description="Minimizes animations and transitions for those sensitive to movement"
              />
              
              <ToggleOption
                setting="largeButtons"
                label="Large Touch Targets"
                description="Makes buttons and clickable areas bigger for easier tapping"
              />
            </div>

            <div style={{
              backgroundColor: isDark ? '#1e3a1e' : '#E8F5E9',
              border: `1px solid ${isDark ? '#2d5f2d' : '#C8E6C9'}`,
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '14px', color: isDark ? '#81c784' : '#2E7D32', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>✓</span>
                <div>
                  You can change all of these settings anytime from your profile page under "Accessibility Settings".
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ 
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '32px',
          borderTop: `2px solid ${isDark ? '#444' : '#f0f0f0'}`
        }}>
          <button
            onClick={handleSkip}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: mutedColor,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '500'
            }}
          >
            Skip for now
          </button>

          <div style={{ display: 'flex', gap: '12px' }}>
            {step > 1 && (
              <button
                onClick={handleBack}
                style={{
                  padding: '12px 24px',
                  backgroundColor: bgColor,
                  color: '#2196F3',
                  border: '2px solid #2196F3',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  minWidth: '100px'
                }}
              >
                ← Back
              </button>
            )}
            
            <button
              onClick={handleNext}
              style={{
                padding: '12px 32px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                minWidth: '120px',
                boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
              }}
            >
              {step === 4 ? 'Finish Setup' : 'Continue →'}
            </button>
          </div>
        </div>

        {/* Step indicator text */}
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px', color: mutedColor }}>
          Step {step} of 4
        </div>
      </div>

      {/* Live Preview Panel */}
      <div style={{
        width: '350px',
        backgroundColor: bgColor,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: '40px',
        alignSelf: 'flex-start',
        transition: 'background-color 0.3s'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: textColor, marginBottom: '16px' }}>
          Live Preview
        </h3>
        
        <div style={{
          backgroundColor: surfaceColor,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            fontSize: fontSizeMap[settings.fontSize], 
            color: textColor, 
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            Welcome to SilverGuide!
          </div>
          <div style={{ 
            fontSize: fontSizeMap[settings.fontSize], 
            color: mutedColor,
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            This preview shows how the app will look with your current settings.
          </div>
          
          <button style={{
            padding: settings.largeButtons ? '14px 28px' : '10px 20px',
            backgroundColor: settings.highContrast ? '#000000' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: settings.largeButtons ? '16px' : '14px',
            fontWeight: '600',
            width: '100%'
          }}>
            Sample Button
          </button>
        </div>

        <div style={{
          fontSize: '13px',
          color: mutedColor,
          padding: '16px',
          backgroundColor: surfaceColor,
          borderRadius: '8px'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '8px', color: textColor }}>
            Current Settings:
          </div>
          <div style={{ marginBottom: '4px' }}>• Text: {settings.fontSize}</div>
          <div style={{ marginBottom: '4px' }}>• Theme: {settings.colorTheme}</div>
          <div style={{ marginBottom: '4px' }}>• Input: {settings.inputMethod}</div>
          {settings.highContrast && <div style={{ marginBottom: '4px' }}>• High Contrast ✓</div>}
          {settings.textToSpeech && <div style={{ marginBottom: '4px' }}>• Text-to-Speech ✓</div>}
          {settings.reduceMotion && <div style={{ marginBottom: '4px' }}>• Reduce Motion ✓</div>}
          {settings.largeButtons && <div style={{ marginBottom: '4px' }}>• Large Buttons ✓</div>}
        </div>
      </div>
    </div>
  );
}
