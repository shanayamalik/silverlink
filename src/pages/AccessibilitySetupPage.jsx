import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AccessibilitySetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const analysisData = location.state?.analysisData || null;
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState({
    fontSize: 'Medium',
    colorTheme: 'Light',
    inputMethod: 'Both',
    reduceMotion: false,
    highContrast: false,
    textToSpeech: true,
    largeButtons: true
  });

  const fontSizeMap = {
    'Small': '14px',
    'Medium': '16px',
    'Large': '20px',
    'Extra Large': '24px'
  };

  const handleSave = () => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    if (analysisData) {
      navigate('/profile-creation', { state: { analysisData } });
    } else {
      navigate('/interview');
    }
  };

  const handleSkip = () => {
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
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const bgColor = isDark ? '#1f2937' : '#ffffff';
  const surfaceColor = isDark ? '#374151' : '#f3f4f6';
  const borderColor = isDark ? '#4b5563' : '#e5e7eb';
  const accentColor = '#0d9488'; // Teal-600
  const accentBg = isDark ? 'rgba(13, 148, 136, 0.2)' : '#f0fdfa';

  // Components
  const FontSizeOption = ({ size, label }) => {
    const isSelected = settings.fontSize === size;
    return (
      <button
        onClick={() => updateSetting('fontSize', size)}
        style={{
          flex: 1,
          padding: '12px 8px',
          border: isSelected ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
          borderRadius: '10px',
          backgroundColor: isSelected ? accentBg : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          boxShadow: isSelected ? '0 2px 4px rgba(13, 148, 136, 0.1)' : 'none'
        }}
      >
        <span style={{ fontSize: fontSizeMap[size], fontWeight: '600', color: textColor }}>Aa</span>
        <span style={{ fontSize: '11px', color: mutedColor, fontWeight: isSelected ? '600' : '400' }}>{label}</span>
      </button>
    );
  };

  const ColorThemeOption = ({ theme, label, previewBg, previewText }) => {
    const isSelected = settings.colorTheme === theme;
    return (
      <button
        onClick={() => updateSetting('colorTheme', theme)}
        style={{
          flex: 1,
          padding: '0',
          border: isSelected ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
          borderRadius: '10px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isSelected ? '0 2px 4px rgba(13, 148, 136, 0.1)' : 'none'
        }}
      >
        <div style={{
          height: '60px',
          width: '100%',
          backgroundColor: previewBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${borderColor}`
        }}>
          <span style={{ color: previewText, fontSize: '16px', fontWeight: '600' }}>Aa</span>
        </div>
        <div style={{
          padding: '10px',
          width: '100%',
          backgroundColor: isSelected ? accentBg : 'transparent',
          color: textColor,
          fontSize: '12px',
          fontWeight: isSelected ? '600' : '500'
        }}>
          {label}
        </div>
      </button>
    );
  };

  const InputMethodOption = ({ method, emoji, label }) => {
    const isSelected = settings.inputMethod === method;
    return (
      <button
        onClick={() => updateSetting('inputMethod', method)}
        style={{
          flex: 1,
          padding: '16px 8px',
          border: isSelected ? `2px solid ${accentColor}` : `1px solid ${borderColor}`,
          borderRadius: '10px',
          backgroundColor: isSelected ? accentBg : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxShadow: isSelected ? '0 2px 4px rgba(13, 148, 136, 0.1)' : 'none'
        }}
      >
        <span style={{ fontSize: '24px' }}>{emoji}</span>
        <span style={{ fontSize: '13px', fontWeight: '600', color: textColor }}>{label}</span>
      </button>
    );
  };

  const ToggleOption = ({ setting, label, description }) => {
    const isEnabled = settings[setting];
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        marginBottom: '8px',
        backgroundColor: isEnabled ? accentBg : 'transparent',
        transition: 'background-color 0.2s'
      }}>
        <div style={{ textAlign: 'left', paddingRight: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: textColor }}>{label}</div>
          <div style={{ fontSize: '11px', color: mutedColor }}>{description}</div>
        </div>
        <button
          onClick={() => updateSetting(setting, !isEnabled)}
          style={{
            width: '36px',
            height: '20px',
            borderRadius: '10px',
            backgroundColor: isEnabled ? accentColor : '#e5e7eb',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            transition: 'background-color 0.2s'
          }}
        >
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            top: '2px',
            left: isEnabled ? '18px' : '2px',
            transition: 'left 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }} />
        </button>
      </div>
    );
  };

  // Persistent Preview Component
  const LivePreview = () => (
    <div style={{
      marginTop: '24px',
      padding: '16px',
      backgroundColor: surfaceColor,
      borderRadius: '12px',
      border: `1px solid ${borderColor}`,
      transition: 'all 0.2s'
    }}>
      <p style={{ fontSize: '11px', fontWeight: '600', color: mutedColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Live App Preview
      </p>

      {/* Mock Chat Message */}
      <div style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        padding: '12px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          flexShrink: 0
        }}>
          JD
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '2px' }}>
            John Doe <span style={{ fontWeight: '400', color: mutedColor, fontSize: '11px' }}>• Volunteer</span>
          </div>
          <div style={{
            fontSize: fontSizeMap[settings.fontSize],
            color: textColor,
            lineHeight: '1.5',
            transition: 'font-size 0.2s ease-out'
          }}>
            Hello! I'm here to help you navigate the airport.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: isDark ? '#111827' : '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: bgColor,
        borderRadius: '16px',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        transition: 'background-color 0.3s'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: textColor, marginBottom: '4px' }}>
            Accessibility
          </h1>
          <div style={{ height: '3px', width: '100%', backgroundColor: surfaceColor, borderRadius: '2px', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(step / 4) * 100}%`,
              backgroundColor: accentColor,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ minHeight: '260px' }}>
          {step === 1 && (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '4px', textAlign: 'center' }}>
                Text Size
              </h2>
              <p style={{ fontSize: '12px', color: mutedColor, marginBottom: '20px', textAlign: 'center' }}>
                Select the size that is easiest for you to read.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                <FontSizeOption size="Small" label="Small" />
                <FontSizeOption size="Medium" label="Medium" />
                <FontSizeOption size="Large" label="Large" />
                <FontSizeOption size="Extra Large" label="Extra Large" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '4px', textAlign: 'center' }}>
                Theme
              </h2>
              <p style={{ fontSize: '12px', color: mutedColor, marginBottom: '20px', textAlign: 'center' }}>
                Select a color scheme.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '8px' }}>
                <ColorThemeOption
                  theme="Light"
                  label="Light Mode"
                  previewBg="#ffffff"
                  previewText="#111827"
                />
                <ColorThemeOption
                  theme="Dark"
                  label="Dark Mode"
                  previewBg="#1f2937"
                  previewText="#ffffff"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '4px', textAlign: 'center' }}>
                Interaction
              </h2>
              <p style={{ fontSize: '12px', color: mutedColor, marginBottom: '20px', textAlign: 'center' }}>
                How do you prefer to interact?
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <InputMethodOption method="Voice" emoji="🎙️" label="Voice" />
                <InputMethodOption method="Text" emoji="⌨️" label="Text" />
                <InputMethodOption method="Both" emoji="💬" label="Both" />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: textColor, marginBottom: '4px', textAlign: 'center' }}>
                Preferences
              </h2>
              <p style={{ fontSize: '12px', color: mutedColor, marginBottom: '20px', textAlign: 'center' }}>
                Additional customization.
              </p>

              <div style={{ marginBottom: '8px' }}>
                <ToggleOption
                  setting="highContrast"
                  label="High Contrast"
                  description="Increase contrast"
                />
                <ToggleOption
                  setting="textToSpeech"
                  label="Text-to-Speech"
                  description="Read messages aloud"
                />
                <ToggleOption
                  setting="reduceMotion"
                  label="Reduce Motion"
                  description="Minimize animations"
                />
                <ToggleOption
                  setting="largeButtons"
                  label="Larger Buttons"
                  description="Easier to tap"
                />
              </div>
            </>
          )}

          {/* Persistent Preview for Steps 1, 2, and 4 */}
          {(step === 1 || step === 2 || step === 4) && <LivePreview />}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${borderColor}` }}>
          <button
            onClick={handleSkip}
            style={{
              fontSize: '13px',
              color: mutedColor,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = surfaceColor}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Skip
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {step > 1 && (
              <button
                onClick={handleBack}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: textColor,
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = surfaceColor}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              style={{
                padding: '8px 24px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'white',
                backgroundColor: accentColor,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(13, 148, 136, 0.2)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              {step === 4 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
