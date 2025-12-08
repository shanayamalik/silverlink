import React, { useState } from 'react';

export default function MergeDecisionPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 'A',
      title: 'Option A: Dual Onboarding Paths',
      tagline: 'Choice is power',
      description: 'Give users a choice between Voice Interview (recommended) and Quick Manual Setup',
      flow: 'Signup → Choice Screen → [Voice Interview OR Quick Preferences] → Dashboard',
      pros: [
        'Users get to choose their preferred method',
        'Both implementations are fully utilized',
        'Accommodates different user preferences',
        'Voice still highlighted as recommended'
      ],
      cons: [
        'More complex user flow with branching',
        'Need to maintain two onboarding paths',
        'Could confuse some users with too many choices'
      ],
      effort: 'Medium',
      color: '#4F46E5',
      liveDemo: '/carrie-demo'
    },
    {
      id: 'B',
      title: 'Option B: Sequential Preferences + Voice',
      tagline: 'Best of both worlds',
      description: 'Quick manual preferences first, then optional deeper Voice Interview',
      flow: 'Signup → Quick Preferences (manual) → Voice Interview (optional) → Dashboard',
      pros: [
        'Lighter voice interview (focuses on bio/interests only)',
        'Faster initial onboarding',
        'Users get quick setup + optional deep dive',
        'Both features complement each other'
      ],
      cons: [
        'Longer overall flow if user does both',
        'Voice interview loses some context',
        'May feel redundant to some users'
      ],
      effort: 'Medium-High',
      color: '#7C3AED',
      liveDemo: '/carrie-demo'
    },
    {
      id: 'C',
      title: 'Option C: Preferences as Edit Feature',
      tagline: 'Clean & focused (Recommended)',
      description: 'Voice Interview for onboarding, manual preferences for editing later',
      flow: 'Signup → Voice Interview → Dashboard (+ "Update Preferences" button → Manual Edit)',
      demoLink: '/option-c-demo',
      pros: [
        'Preserves your voice interview as star feature',
        'Clear purpose for each component (create vs edit)',
        'Solves real UX need (preference editing)',
        'No overlap or conflict',
        'Minimal refactoring needed'
      ],
      cons: [
        'Users don\'t see manual preferences during onboarding',
        'Carrie\'s work is secondary rather than primary'
      ],
      effort: 'Low',
      color: '#059669',
      recommended: true
    },
    {
      id: 'D',
      title: 'Option D: Unified Profile Creation',
      tagline: 'All in one place',
      description: 'Merge manual preferences UI into existing Profile Creation page',
      flow: 'Signup → Voice Interview → Profile Creation (with help type selector) → Dashboard',
      pros: [
        'Single comprehensive profile page',
        'All profile data in one location',
        'Easy to review and edit everything',
        'Integrated experience'
      ],
      cons: [
        'Profile Creation page becomes very long',
        'Loses the focused "preferences" concept',
        'More UI work to integrate properly'
      ],
      effort: 'Medium',
      color: '#DC2626',
      liveDemo: '/carrie-demo'
    }
  ];

  const handleSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      alert(`You selected Option ${selectedOption}! I'll implement this approach.`);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          color: 'white', 
          margin: '0 0 12px 0',
          textAlign: 'center'
        }}>
          🤝 Merge Decision: Carrie's Code Integration
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: 'rgba(255,255,255,0.9)', 
          textAlign: 'center',
          margin: 0
        }}>
          Choose how to integrate Carrie's PreferencesPage with your Voice Interview
        </p>
      </div>

      {/* Options Grid */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {options.map(option => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              cursor: 'pointer',
              border: selectedOption === option.id ? `4px solid ${option.color}` : '4px solid transparent',
              boxShadow: selectedOption === option.id 
                ? `0 20px 40px rgba(0,0,0,0.2), 0 0 0 4px ${option.color}20`
                : '0 10px 30px rgba(0,0,0,0.15)',
              transform: selectedOption === option.id ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            {/* Recommended Badge */}
            {option.recommended && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: option.color,
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                ⭐ Recommended
              </div>
            )}

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: option.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700'
                }}>
                  {option.id}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    margin: '0 0 4px 0',
                    color: '#1a1a1a'
                  }}>
                    {option.title}
                  </h2>
                  <div style={{ 
                    fontSize: '13px', 
                    color: option.color,
                    fontWeight: '600',
                    fontStyle: 'italic'
                  }}>
                    {option.tagline}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{ 
              fontSize: '15px', 
              lineHeight: '1.6', 
              color: '#333',
              marginBottom: '20px'
            }}>
              {option.description}
            </p>

            {/* Flow */}
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ 
                fontSize: '11px', 
                color: '#999', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}>
                User Flow
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#555',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                {option.flow}
              </div>
            </div>

            {/* Pros & Cons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Pros */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#059669', 
                  fontWeight: '700',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ✓ Pros
                </div>
                <ul style={{ 
                  margin: 0, 
                  padding: '0 0 0 16px',
                  fontSize: '13px',
                  color: '#333',
                  lineHeight: '1.6'
                }}>
                  {option.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{pro}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#dc2626', 
                  fontWeight: '700',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ✗ Cons
                </div>
                <ul style={{ 
                  margin: 0, 
                  padding: '0 0 0 16px',
                  fontSize: '13px',
                  color: '#333',
                  lineHeight: '1.6'
                }}>
                  {option.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Effort Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: option.effort === 'Low' ? '#ecfdf5' : option.effort === 'Medium' ? '#fef3c7' : '#fee2e2',
                color: option.effort === 'Low' ? '#059669' : option.effort === 'Medium' ? '#a16207' : '#dc2626',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Effort: {option.effort}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {(option.demoLink || option.liveDemo) && (
                  <a
                    href={option.demoLink || option.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: option.color,
                      fontSize: '12px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      padding: '4px 8px',
                      border: `1px solid ${option.color}`,
                      borderRadius: '4px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    👁️ {option.liveDemo ? 'Try Live Demo' : 'View Demo'}
                  </a>
                )}
                {selectedOption === option.id && (
                  <div style={{
                    color: option.color,
                    fontSize: '14px',
                    fontWeight: '700'
                  }}>
                    ✓ Selected
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      {selectedOption && (
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <button
            onClick={handleConfirm}
            style={{
              padding: '16px 48px',
              background: 'white',
              color: options.find(o => o.id === selectedOption)?.color,
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Implement Option {selectedOption} →
          </button>
        </div>
      )}
    </div>
  );
}
