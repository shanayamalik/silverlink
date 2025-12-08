import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import VolunteerCard from '../components/VolunteerCard';
import { mockVolunteers } from '../data/mockVolunteers';
import { matchVolunteers } from '../utils/matching';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  // Default to all expanded (Show)
  const [collapsed, setCollapsed] = useState({ profile: false, chats: false, recommendations: false });

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    // Load user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Calculate matches if profile exists
      if (parsedUser.profile) {
        const calculatedMatches = matchVolunteers(mockVolunteers, parsedUser.profile, { maxResults: 2 });
        setMatches(calculatedMatches);
      }
    }
  }, []);

  // Hardcoded demo chats
  const recentChats = [
    { id: 1, name: 'Maria Santos', date: 'Yesterday', message: 'That sounds like a lovely book! I can bring my copy next time.', avatar: '👩‍🏫' },
    { id: 2, name: 'Raj Patel', date: '2 days ago', message: 'No problem, we can try setting up the iPad on Tuesday.', avatar: '💻' }
  ];

  if (!user) return null;

  // --- Professional Style Constants ---
  const containerStyle = { 
    backgroundColor: '#f8f9fa', 
    minHeight: '100vh', 
    paddingBottom: '4rem' 
  };

  const cardStyle = { 
    backgroundColor: 'white', 
    borderRadius: '6px', 
    padding: '1.25rem', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
    border: '1px solid #e2e8f0' 
  };

  const getTextStyle = (type) => {
    return type === 'h1' ? { fontSize: '20px', color: '#0f172a', fontWeight: '600', letterSpacing: '-0.01em' } :
           type === 'h2' ? { fontSize: '15px', color: '#334155', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' } :
           { fontSize: '13px', color: '#475569', lineHeight: '1.5' };
  };

  const renderSectionHeader = (title, sectionKey, action) => {
    const isCollapsed = collapsed[sectionKey];
    
    const indicator = (
      <span style={{ 
        fontSize: '10px', 
        color: isCollapsed ? '#64748b' : '#0f766e', 
        fontWeight: '600', 
        backgroundColor: isCollapsed ? '#f1f5f9' : '#f0fdfa', 
        padding: '2px 8px', 
        borderRadius: '4px', 
        border: isCollapsed ? '1px solid #e2e8f0' : '1px solid #ccfbf1' 
      }}>
        {isCollapsed ? 'SHOW' : 'HIDE'}
      </span>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isCollapsed ? '0' : '1rem' }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
          onClick={() => toggleSection(sectionKey)}
        >
          <h2 style={{ ...getTextStyle('h2'), margin: 0 }}>{title}</h2>
          {indicator}
        </div>
        {action}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <Header title="Dashboard" showHome={false} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ ...getTextStyle('h1'), marginBottom: '0.5rem' }}>
            Welcome back, {user.name || 'Friend'}! 👋
          </h1>
          <p style={getTextStyle('p')}>Here's what's happening with your connections.</p>
        </div>

        {/* Main Content Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem'
        }}>
          
          {/* Left Column (Profile & Chats) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Profile Summary Card */}
            <div style={{ 
              ...cardStyle,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {renderSectionHeader('Your Profile', 'profile', 
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={() => navigate('/profile-creation', { state: { analysisData: user.profile } })}
                  style={{ fontSize: '12px', padding: '4px 10px' }}
                >
                  Edit
                </Button>
              )}
              
              {!collapsed.profile && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      {user.profile?.interests?.slice(0, 3).map((interest, i) => (
                        <span key={i} style={{ 
                          fontSize: '11px', 
                          padding: '3px 8px', 
                          backgroundColor: '#F3E5F5', 
                          color: '#9C27B0', 
                          borderRadius: '4px',
                          fontWeight: '600'
                        }}>
                          {interest}
                        </span>
                      ))}
                    </div>
                    <p style={{ ...getTextStyle('p'), margin: 0 }}>
                      Looking for: {user.profile?.helpNeeded?.join(', ') || 'Companionship'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Chats Section */}
            <div>
              {renderSectionHeader('Recent Chats', 'chats', 
                <button style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>View All</button>
              )}
              
              {!collapsed.chats && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentChats.map(chat => (
                    <div key={chat.id} style={{ 
                      ...cardStyle,
                      padding: '1rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}>
                      <div style={{ 
                        fontSize: '20px', width: '40px', height: '40px', 
                        backgroundColor: '#E0F2F1', 
                        borderRadius: '6px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                      }}>
                        {chat.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontWeight: '600', color: '#333', fontSize: '13px' }}>{chat.name}</span>
                          <span style={{ fontSize: '11px', color: '#888' }}>{chat.date}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {chat.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Recommendations) */}
          <div>
            {renderSectionHeader('Recommended for You', 'recommendations', 
              <button 
                onClick={() => navigate('/volunteers')}
                style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                See All Matches
              </button>
            )}

            {!collapsed.recommendations && (
              matches.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {matches.map(volunteer => (
                    <div key={volunteer.id} style={{ height: '100%' }}>
                      <VolunteerCard 
                        volunteer={volunteer} 
                        onViewProfile={() => navigate('/volunteers')} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', ...cardStyle }}>
                  <p style={getTextStyle('p')}>Complete your profile to see recommendations!</p>
                  <Button onClick={() => navigate('/interview')}>Start Interview</Button>
                </div>
              )
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
