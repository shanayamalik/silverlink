import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HelpCenterPreview() {
  const [selectedOption, setSelectedOption] = useState('A');
  const navigate = useNavigate();

  // Sample FAQ data
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create my profile?',
          a: 'Click "Start Voice Interview" on the homepage. Our AI will guide you through a friendly conversation to learn about your interests and preferences. You can also edit your profile anytime from the Dashboard.'
        },
        {
          q: 'How does volunteer matching work?',
          a: 'We use an intelligent matching system that considers your interests, availability, help needs, and language preferences to find the best volunteer companions for you.'
        },
        {
          q: 'Is SilverLink free to use?',
          a: 'Yes! SilverLink is completely free for seniors and volunteers. Our mission is to build meaningful connections in our community.'
        }
      ]
    },
    {
      category: 'Scheduling & Visits',
      questions: [
        {
          q: 'How do I schedule a visit?',
          a: 'Go to your Dashboard, click the Schedule tab, and click "New Visit". Choose your volunteer, activity, meeting type (virtual or in-person), date, and time.'
        },
        {
          q: 'Can I reschedule or cancel a visit?',
          a: 'Yes! On the Schedule tab, find your visit and click "Edit" to change details, or "Delete" to cancel it entirely.'
        },
        {
          q: 'What meeting types are available?',
          a: 'We support Zoom, Phone, FaceTime, Google Meet, Skype, In-Person visits, and custom locations. Choose what works best for you!'
        }
      ]
    },
    {
      category: 'Communication',
      questions: [
        {
          q: 'How do I message my volunteer?',
          a: 'Go to the Messages tab in your Dashboard to see all your conversations. Click on any volunteer to continue chatting.'
        },
        {
          q: 'Can I use different languages?',
          a: 'Yes! During the voice interview, you can select from 7 languages including English, Spanish, Chinese, Hindi, French, Portuguese, and Japanese.'
        }
      ]
    },
    {
      category: 'Accessibility',
      questions: [
        {
          q: 'What accessibility features are available?',
          a: 'We offer adjustable font sizes, high contrast themes, text-to-speech, voice input, large buttons, and simple navigation designed specifically for seniors.'
        },
        {
          q: 'How do I change accessibility settings?',
          a: 'Click on your profile menu (top right) and select "Settings". From there, you can adjust font size, theme, and other preferences.'
        }
      ]
    }
  ];

  const guides = [
    { icon: '🎤', title: 'Voice Interview Guide', desc: 'Learn how to complete your profile using our AI assistant' },
    { icon: '📅', title: 'Scheduling Visits', desc: 'Step-by-step guide to booking and managing visits' },
    { icon: '💬', title: 'Messaging Tips', desc: 'How to stay connected with your volunteers' },
    { icon: '⚙️', title: 'Customizing Settings', desc: 'Personalize your experience with accessibility options' }
  ];

  // Option A: Traditional FAQ with Expandable Sections
  const OptionA = () => {
    const [expandedCategory, setExpandedCategory] = useState(0);
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
        {/* Header */}
        <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#64748b',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            ← Back to Dashboard
          </button>
          
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
            Help Center
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            Find answers to common questions and learn how to use SilverLink
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '900px', margin: '0 auto 2rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for help..."
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                fontSize: '16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none'
              }}
            />
            <svg
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* FAQ Sections */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqs.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}
            >
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === sectionIdx ? null : sectionIdx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  background: expandedCategory === sectionIdx ? '#f1f5f9' : 'white',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                  {section.category}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  style={{
                    transform: expandedCategory === sectionIdx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Questions */}
              {expandedCategory === sectionIdx && (
                <div style={{ padding: '0 1.5rem 1rem' }}>
                  {section.questions.map((item, qIdx) => (
                    <div key={qIdx} style={{ marginBottom: '0.75rem' }}>
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === `${sectionIdx}-${qIdx}` ? null : `${sectionIdx}-${qIdx}`)}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          background: 'white',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '15px', fontWeight: '500', color: '#334155' }}>
                          {item.q}
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0d9488"
                          strokeWidth="2"
                        >
                          {expandedQuestion === `${sectionIdx}-${qIdx}` ? (
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          ) : (
                            <>
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </>
                          )}
                        </svg>
                      </button>
                      {expandedQuestion === `${sectionIdx}-${qIdx}` && (
                        <div style={{
                          padding: '16px',
                          marginTop: '8px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#475569'
                        }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div style={{ maxWidth: '900px', margin: '2rem auto 0', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '1rem' }}>
            Still need help? We're here for you!
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#0d9488',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Contact Support
          </button>
        </div>
      </div>
    );
  };

  // Option B: Card-based Guide Library
  const OptionB = () => {
    const [selectedGuide, setSelectedGuide] = useState(null);

    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              color: '#64748b',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            ← Back
          </button>

          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
            📚 Help & Guides
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '2rem' }}>
            Everything you need to get the most out of SilverLink
          </p>

          {/* Quick Start Guides */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {guides.map((guide, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGuide(idx)}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedGuide === idx ? '0 4px 12px rgba(13, 148, 136, 0.15)' : 'none',
                  borderColor: selectedGuide === idx ? '#0d9488' : '#e2e8f0'
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '0.75rem' }}>{guide.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                  {guide.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                  {guide.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Popular Questions */}
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
            💡 Popular Questions
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs[0].questions.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>
                  {item.q}
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Option C: Sidebar Navigation with Content Area
  const OptionC = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: 'white',
          borderRight: '1px solid #e2e8f0',
          padding: '2rem 1.5rem',
          overflowY: 'auto'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              color: '#64748b',
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              width: '100%'
            }}
          >
            ← Back
          </button>

          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>
            Help Center
          </h2>

          <nav>
            {faqs.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: activeCategory === idx ? '#e0f2f1' : 'transparent',
                  color: activeCategory === idx ? '#0d9488' : '#64748b',
                  fontWeight: activeCategory === idx ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                {section.category}
              </button>
            ))}
          </nav>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '0.75rem' }}>
              Need more help?
            </p>
            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Contact Support
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
              {faqs[activeCategory].category}
            </h1>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '2rem' }}>
              Common questions about {faqs[activeCategory].category.toLowerCase()}
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {faqs[activeCategory].questions.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#e0f2f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0d9488',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Q
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem' }}>
                        {item.q}
                      </h3>
                      <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7' }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Option D: Minimal Accordion Style
  const OptionD = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'white', padding: '2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#64748b',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
          >
            ← Back to Dashboard
          </button>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
              How can we help?
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              Find answers to frequently asked questions
            </p>
          </div>

          {/* All questions in one list */}
          <div>
            {faqs.map((section, sectionIdx) => (
              <div key={sectionIdx} style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0d9488',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem'
                }}>
                  {section.category}
                </h2>
                {section.questions.map((item, qIdx) => {
                  const isOpen = openQuestion === `${sectionIdx}-${qIdx}`;
                  return (
                    <div
                      key={qIdx}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        paddingBottom: '1rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : `${sectionIdx}-${qIdx}`)}
                        style={{
                          width: '100%',
                          padding: '12px 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', paddingRight: '1rem' }}>
                          {item.q}
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0d9488"
                          strokeWidth="2"
                          style={{
                            flexShrink: 0,
                            transition: 'transform 0.2s',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      {isOpen && (
                        <div style={{
                          padding: '1rem 0',
                          fontSize: '15px',
                          lineHeight: '1.7',
                          color: '#64748b'
                        }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Contact Card */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '1.5rem' }}>
              Our support team is ready to help you
            </p>
            <button style={{
              padding: '12px 32px',
              backgroundColor: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Option E: Hybrid - Sidebar + Minimal Accordion (Compact & Professional)
  const OptionE = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openQuestion, setOpenQuestion] = useState(null);

    return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafbfc' }}>
        {/* Compact Sidebar */}
        <div style={{
          width: '260px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          padding: '1.5rem 1rem',
          overflowY: 'auto'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '6px 10px',
              backgroundColor: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              color: '#64748b',
              fontSize: '12px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              width: '100%',
              fontWeight: '500'
            }}
          >
            ← Back
          </button>

          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
            Help Center
          </h2>

          <nav>
            {faqs.map((section, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(idx);
                  setOpenQuestion(null);
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: activeCategory === idx ? '#e0f2f1' : 'transparent',
                  color: activeCategory === idx ? '#0d9488' : '#64748b',
                  fontWeight: activeCategory === idx ? '600' : '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  transition: 'all 0.15s'
                }}
              >
                {section.category}
              </button>
            ))}
          </nav>

          <div style={{
            marginTop: '1.5rem',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
              Need more help?
            </p>
            <button style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#0d9488',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Contact Support
            </button>
          </div>
        </div>

        {/* Content Area - Minimal Accordion */}
        <div style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
          <div style={{ maxWidth: '680px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
              {faqs[activeCategory].category}
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '1.5rem' }}>
              Common questions about {faqs[activeCategory].category.toLowerCase()}
            </p>

            {/* Minimal accordion list */}
            <div>
              {faqs[activeCategory].questions.map((item, qIdx) => {
                const isOpen = openQuestion === `${activeCategory}-${qIdx}`;
                return (
                  <div
                    key={qIdx}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '12px',
                      marginBottom: '12px'
                    }}
                  >
                    <button
                      onClick={() => setOpenQuestion(isOpen ? null : `${activeCategory}-${qIdx}`)}
                      style={{
                        width: '100%',
                        padding: '10px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', paddingRight: '1rem' }}>
                        {item.q}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="2"
                        style={{
                          flexShrink: 0,
                          transition: 'transform 0.2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '8px 0',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#64748b'
                      }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Option Selector */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '0.75rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem' }}>
          Preview Options
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['A', 'B', 'C', 'D', 'E'].map(option => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              style={{
                padding: '6px 10px',
                border: selectedOption === option ? '2px solid #0d9488' : '1px solid #e2e8f0',
                borderRadius: '6px',
                backgroundColor: selectedOption === option ? '#e0f2f1' : 'white',
                color: selectedOption === option ? '#0d9488' : '#64748b',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Render selected option */}
      {selectedOption === 'A' && <OptionA />}
      {selectedOption === 'B' && <OptionB />}
      {selectedOption === 'C' && <OptionC />}
      {selectedOption === 'D' && <OptionD />}
      {selectedOption === 'E' && <OptionE />}
    </div>
  );
}

export default HelpCenterPreview;
