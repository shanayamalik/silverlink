import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerCard from '../components/VolunteerCard';
import { mockVolunteers } from '../data/mockVolunteers';
import { matchVolunteers } from '../utils/matching';

// Extended Profile Modal Component
function ExtendedProfileModal({ volunteer, onClose }) {
  if (!volunteer) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', maxWidth: '500px',
        width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '12px',
            backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '36px', flexShrink: 0
          }}>
            {volunteer.icon || '👤'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '22px' }}>{volunteer.name}</h2>
            <span style={{ 
              fontSize: '0.65rem', 
              color: '#059669', 
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '4px',
              padding: '2px 6px',
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '3px',
              fontWeight: '500'
            }}>
              ✓ Verified
            </span>
          </div>
        </div>

        {/* About Me */}
        {volunteer.about && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About Me</p>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#444' }}>{volunteer.about}</p>
          </div>
        )}

        {/* Can Help With */}
        {volunteer.helpsWith?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can Help With</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {volunteer.helpsWith.map((item, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 12px', backgroundColor: '#E8F5E9', borderRadius: '6px', color: '#2E7D32' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Interests */}
        {volunteer.skills?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills & Interests</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {volunteer.skills.map((skill, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 12px', backgroundColor: '#F5F5F5', borderRadius: '6px', color: '#555' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {volunteer.languages?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Languages</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>🗣️ {volunteer.languages.join(', ')}</p>
          </div>
        )}

        {/* Availability */}
        {volunteer.availability && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Availability</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>📅 {volunteer.availability}</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'transparent',
              border: '1px solid #9ca3af',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.borderColor = '#6b7280'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = '#9ca3af'; }}
          >
            Close
          </button>
          <button
            onClick={() => navigate(`/chat/${volunteer.id}`, { state: { volunteer } })}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: '#0d9488',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0f766e'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0d9488'}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  // Initialize user from localStorage to prevent flash of null/crash
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileVolunteer, setProfileVolunteer] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.profile) {
      setMatches(matchVolunteers(mockVolunteers, user.profile, { maxResults: 3 }));
    }
  }, [user, navigate]);

  const recentChats = [
    { 
      id: 14, 
      name: 'Henry Nakamura', 
      date: '10:30 AM', 
      message: 'I found that chess strategy we talked about.', 
      avatar: '🎮',
      history: [
        { id: 1, sender: 'user', text: 'Hi Henry, do you have time for a game this week?', time: 'Yesterday' },
        { id: 2, sender: 'volunteer', text: 'Hello! Yes, I\'d love to. Have you been practicing?', time: 'Yesterday' },
        { id: 3, sender: 'user', text: 'A little bit. I was looking at that opening you showed me.', time: '10:15 AM' },
        { id: 4, sender: 'volunteer', text: 'The Italian Game? Excellent choice. It focuses on rapid development.', time: '10:20 AM' },
        { id: 5, sender: 'user', text: 'Yes, that\'s the one. I struggle with the mid-game though.', time: '10:22 AM' },
        { id: 6, sender: 'volunteer', text: 'We can work on that. It\'s all about controlling the center.', time: '10:25 AM' },
        { id: 7, sender: 'volunteer', text: 'I found that chess strategy we talked about.', time: '10:30 AM' }
      ]
    },
    { 
      id: 15, 
      name: 'Patricia Reyes', 
      date: 'Yesterday', 
      message: 'The garden photos you sent are beautiful!', 
      avatar: '🍳',
      history: [
        { id: 1, sender: 'user', text: 'Hi Patricia, my tomatoes are finally turning red!', time: '2 days ago' },
        { id: 2, sender: 'volunteer', text: 'That\'s wonderful news! It\'s been such a sunny week.', time: '2 days ago' },
        { id: 3, sender: 'user', text: 'Yes, I took some pictures this morning.', time: 'Yesterday' },
        { id: 4, sender: 'volunteer', text: 'I\'d love to see them. Are you watering them every day?', time: 'Yesterday' },
        { id: 5, sender: 'user', text: 'Mostly every other day. Is that enough?', time: 'Yesterday' },
        { id: 6, sender: 'volunteer', text: 'With this heat, maybe check the soil daily.', time: 'Yesterday' },
        { id: 7, sender: 'volunteer', text: 'The garden photos you sent are beautiful!', time: 'Yesterday' }
      ]
    },
    { 
      id: 101, 
      name: 'Community Support', 
      date: '2 days ago', 
      message: 'Your weekly schedule is confirmed.', 
      avatar: '🤝',
      history: [
        { id: 1, sender: 'volunteer', text: 'Hello! Just checking in to see how your first week went.', time: '3 days ago' },
        { id: 2, sender: 'user', text: 'It was great, thank you. Everyone has been very kind.', time: '3 days ago' },
        { id: 3, sender: 'volunteer', text: 'Glad to hear it. Your weekly schedule is confirmed.', time: '2 days ago' }
      ]
    },
    { 
      id: 13, 
      name: 'Grace Okafor', 
      date: '3 days ago', 
      message: 'I look forward to it. See you then!', 
      avatar: '🙏',
      history: [
        { id: 1, sender: 'user', text: 'Hi Grace, are you free for a chat this Sunday?', time: '4 days ago' },
        { id: 2, sender: 'volunteer', text: 'Hello! Yes, I would love to stop by after service.', time: '3 days ago' },
        { id: 3, sender: 'user', text: 'That would be great. I\'ll make some tea.', time: '3 days ago' },
        { id: 4, sender: 'volunteer', text: 'I look forward to it. See you then!', time: '3 days ago' }
      ]
    }
  ];

  if (!user) return null;

  // --- Hybrid Layout Components ---

  const WelcomeBanner = () => (
    <div style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '0.25rem' }}>
        Welcome back, {user.name || 'Friend'}! 👋
      </h1>
      <p style={{ color: '#64748b', fontSize: '14px' }}>Here's what's happening today.</p>
    </div>
  );

  // Compact Style Stats Bar
  const StatsSection = () => {
    const stats = [
      { label: 'New Matches', value: matches.length, icon: '🤝' },
      { label: 'Unread Messages', value: '2', icon: '💬' },
      { label: 'Upcoming Visits', value: '2', icon: '📅' }
    ];

    return (
      <div style={{ 
        display: 'flex', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem',
        padding: '0.75rem 1.5rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: i === 1 ? 'center' : (i === 2 ? 'flex-end' : 'flex-start') }}>
            <div style={{ fontSize: '18px', padding: '6px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>{stat.icon}</div>
            <div>
              <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '16px', lineHeight: '1.2' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Classic Grid Style Matches (More Compact)
  const MatchesSection = () => (
    <div style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', height: '24px' }}>
        <h2 style={{ fontSize: '16px', color: '#334155', fontWeight: '600', margin: 0 }}>Your Top Matches</h2>
        <button onClick={() => setActiveTab('matches')} style={{ color: '#0d9488', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '12px', padding: 0 }}>View All</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {matches.map((volunteer, i) => (
          <div key={volunteer.id} style={{ height: '100%' }}>
            <VolunteerCard volunteer={volunteer} onViewProfile={() => setProfileVolunteer(volunteer)} />
          </div>
        ))}
      </div>
    </div>
  );

  // Compact Style Messages List (More Compact)
  const MessagesSection = () => (
    <div style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', height: '24px' }}>
        <h2 style={{ fontSize: '16px', color: '#334155', fontWeight: '600', margin: 0 }}>Recent Messages</h2>
        <button onClick={() => setActiveTab('messages')} style={{ color: '#0d9488', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '12px', padding: 0 }}>View All</button>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {recentChats.map((chat, i) => {
          // Default unread: Henry (14) and Patricia (15)
          const isUnread = chat.id === 14 || chat.id === 15;
          
          return (
            <div key={chat.id} 
              onClick={() => {
                navigate(`/chat/${chat.id}`, { state: { volunteer: { name: chat.name, avatar: chat.avatar }, history: chat.history } });
              }}
              style={{ 
                padding: '10px 14px', 
                borderBottom: i !== recentChats.length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: isUnread ? '#f8fafc' : 'transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = isUnread ? '#f8fafc' : 'white'}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  fontSize: '14px', 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {chat.avatar}
                </div>
                {isUnread && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    width: '10px', height: '10px',
                    backgroundColor: '#ea580c', borderRadius: '50%',
                    border: '2px solid white'
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: isUnread ? '700' : '600', color: '#334155', fontSize: '12px' }}>{chat.name}</span>
                  <span style={{ fontSize: '10px', color: isUnread ? '#ea580c' : '#94a3b8', fontWeight: isUnread ? '600' : '400' }}>{chat.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: isUnread ? '#1e293b' : '#64748b', fontWeight: isUnread ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Matches View Component
  const MatchesView = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Your Volunteer Matches</h2>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {matches.map(volunteer => (
          <VolunteerCard
            key={volunteer.id}
            volunteer={volunteer}
            onViewProfile={() => setProfileVolunteer(volunteer)}
          />
        ))}
      </div>
      
      {matches.length === 0 && (
        <div style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>
          <p style={{ fontSize: '48px', marginBottom: '1rem' }}>🔍</p>
          <p>No volunteers found. Complete your profile to see matches!</p>
        </div>
      )}
    </div>
  );

  // Messages View Component
  const MessagesView = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Your Messages</h2>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {recentChats.map((chat, i) => {
          const isUnread = chat.id === 14 || chat.id === 15;
          return (
            <div key={chat.id} 
              onClick={() => {
                navigate(`/chat/${chat.id}`, { state: { volunteer: { name: chat.name, avatar: chat.avatar }, history: chat.history } });
              }}
              style={{ 
                padding: '12px 16px', 
                borderBottom: i !== recentChats.length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: isUnread ? '#f8fafc' : 'transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = isUnread ? '#f8fafc' : 'white'}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  fontSize: '18px', 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {chat.avatar}
                </div>
                {isUnread && (
                  <div style={{
                    position: 'absolute', top: -2, right: -2,
                    width: '10px', height: '10px',
                    backgroundColor: '#ea580c', borderRadius: '50%',
                    border: '2px solid white'
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: isUnread ? '700' : '600', color: '#334155', fontSize: '14px' }}>{chat.name}</span>
                  <span style={{ fontSize: '12px', color: isUnread ? '#ea580c' : '#94a3b8', fontWeight: isUnread ? '600' : '400' }}>{chat.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: isUnread ? '#1e293b' : '#64748b', fontWeight: isUnread ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Schedule View Component
  const ScheduleView = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Upcoming Visits</h2>
        <button style={{ backgroundColor: '#0d9488', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>
          + Schedule New
        </button>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px 10px', borderRadius: '8px', textAlign: 'center', minWidth: '50px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>DEC</div>
            <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1 }}>12</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '2px', fontSize: '14px' }}>Coffee & Chat with Grace</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>10:00 AM - 11:00 AM • At Home</div>
          </div>
          <button style={{ color: '#64748b', background: 'none', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Reschedule</button>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 16px' }}>
          <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 10px', borderRadius: '8px', textAlign: 'center', minWidth: '50px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>DEC</div>
            <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1 }}>15</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '2px', fontSize: '14px' }}>Chess Game with Henry</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>2:00 PM - 3:30 PM • Community Center</div>
          </div>
          <button style={{ color: '#64748b', background: 'none', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Reschedule</button>
        </div>
      </div>
    </div>
  );

  // Profile View Component
  const ProfileView = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', marginBottom: '1.5rem' }}>My Profile</h2>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', 
          margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px'
        }}>
          👤
        </div>
        
        <h3 style={{ fontSize: '18px', color: '#1e293b', margin: '0 0 0.5rem', fontWeight: '600' }}>{user.name}</h3>
        <p style={{ color: '#64748b', margin: '0 0 2rem', fontSize: '14px' }}>{user.role === 'senior' ? 'Senior Member' : 'Volunteer'}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <button style={{ 
            width: '100%', maxWidth: '280px', padding: '8px 16px', 
            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px',
            color: '#334155', fontWeight: '500', cursor: 'pointer', fontSize: '14px'
          }}>
            Edit Profile
          </button>
          <button style={{ 
            width: '100%', maxWidth: '280px', padding: '8px 16px', 
            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px',
            color: '#334155', fontWeight: '500', cursor: 'pointer', fontSize: '14px'
          }}>
            Notification Settings
          </button>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', maxWidth: '280px', padding: '8px 16px', 
              backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '6px',
              color: '#dc2626', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', fontSize: '14px'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  // --- Sidebar Styles (Classic Dark) ---
  const sidebarStyles = {
    width: '260px',
    padding: '1.5rem',
    bg: '#1e293b',
    text: 'white',
    itemPadding: '12px 16px',
    activeBg: '#0d9488',
    activeText: 'white'
  };

  const icons = {
    dashboard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    matches: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    messages: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    schedule: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    profile: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Sidebar */}
      <div style={{ 
        width: sidebarStyles.width, 
        padding: sidebarStyles.padding, 
        backgroundColor: sidebarStyles.bg,
        color: sidebarStyles.text,
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          SilverGuide
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'matches', label: 'My Matches' },
            { id: 'messages', label: 'Messages' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'profile', label: 'Profile' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: sidebarStyles.itemPadding,
                border: 'none', borderRadius: '8px',
                cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: activeTab === item.id ? '600' : '500',
                backgroundColor: activeTab === item.id ? sidebarStyles.activeBg : 'transparent',
                color: activeTab === item.id ? sidebarStyles.activeText : '#f1f5f9',
                transition: 'all 0.2s',
                boxShadow: activeTab === item.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>{icons[item.id]}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          
          <div style={{ 
            padding: '16px', 
            borderRadius: '12px', 
            backgroundColor: 'rgba(15, 23, 42, 0.6)', 
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                backgroundColor: '#0d9488', 
                color: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: '600', fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'white' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Volunteer</div>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              style={{ 
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#e2e8f0', 
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = '#ef4444'; 
                e.currentTarget.style.borderColor = '#ef4444';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#e2e8f0';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Log Out
            </button>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <WelcomeBanner />
          <StatsSection />
          
          {/* Hybrid Grid: Matches (Cards) + Messages (List) */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <MatchesSection />
              <MessagesSection />
            </div>
          )}

          {/* Schedule View */}
          {activeTab === 'schedule' && <ScheduleView />}
          
          
          {/* Matches View */}
          {activeTab === 'matches' && <MatchesView />}
          
          {/* Messages View */}
          {activeTab === 'messages' && <MessagesView />}
          
          {/* Profile View */}
          {activeTab === 'profile' && <ProfileView />}
        </div>
      </div>

      {/* Profile Modal */}
      {profileVolunteer && (
        <ExtendedProfileModal 
          volunteer={profileVolunteer} 
          onClose={() => setProfileVolunteer(null)} 
        />
      )}
    </div>
  );
}
