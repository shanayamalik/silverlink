import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HelpCenterPreview() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(null);
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '8px 14px',
            backgroundColor: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            color: '#64748b',
            fontSize: '13px',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}
        >
          ← Back to Dashboard
        </button>

        <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
          Help Center
        </h1>
        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '2rem' }}>
          Find answers to common questions about using SilverLink
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto',
          paddingBottom: '0'
        }}>
          {faqs.map((section, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenQuestion(null);
              }}
              style={{
                padding: '10px 16px',
                border: 'none',
                borderBottom: activeCategory === idx ? '2px solid #0d9488' : '2px solid transparent',
                backgroundColor: 'transparent',
                color: activeCategory === idx ? '#0d9488' : '#64748b',
                fontWeight: activeCategory === idx ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div>
          {faqs[activeCategory].questions.map((item, qIdx) => {
            const isOpen = openQuestion === `${activeCategory}-${qIdx}`;
            return (
              <div
                key={qIdx}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : `${activeCategory}-${qIdx}`)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
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
                    padding: '0 20px 16px 20px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
            Still need help?
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '1.5rem' }}>
            Our support team is here to assist you
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#0d9488',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterPreview;
