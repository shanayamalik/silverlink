import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerCard from '../components/VolunteerCard';
import SchedulingCalendar from '../components/SchedulingCalendar';
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
  
  // State for unread messages (persisted in localStorage for prototype)
  const [unreadMessageIds, setUnreadMessageIds] = useState(() => {
    const saved = localStorage.getItem('unreadMessageIds');
    // Default to all 4 chat IDs if nothing saved
    return saved ? JSON.parse(saved) : [14, 15, 101, 13];
  });

  // Welcome modal for first-time users
  // TODO: Design a better first-time user onboarding experience that's more minimalist and less intrusive
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Disabled for now
  // const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
  //   const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
  //   return !hasSeenWelcome;
  // });

  const closeWelcomeModal = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcomeModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    let computedMatches = [];
    // Check if user has a profile (interview completed)
    const hasProfile = user.profile && Object.keys(user.profile).length > 0;

    if (hasProfile) {
      // If profile exists, show ONLY the computed matches
      computedMatches = matchVolunteers(mockVolunteers, user.profile, { maxResults: 3 });
      setMatches(computedMatches);
    } else {
      // If no profile, show ONLY the hardcoded volunteers (Grace and Henry)
      // and show a CTA to encourage profile creation
      const hardcodedIds = ['13', '14'];
      const hardcodedVolunteers = mockVolunteers.filter(v => hardcodedIds.includes(v.id));
      setMatches(hardcodedVolunteers);
    }
  }, [user, navigate]);

  const markAsRead = (id) => {
    const newList = unreadMessageIds.filter(msgId => msgId !== id);
    setUnreadMessageIds(newList);
    localStorage.setItem('unreadMessageIds', JSON.stringify(newList));
  };

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
      { label: 'Unread Messages', value: unreadMessageIds.length, icon: '💬' },
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
        <h2 style={{ fontSize: '16px', color: '#334155', fontWeight: '600', margin: 0 }}>
          {(!user.profile || Object.keys(user.profile).length === 0) ? 'Suggested Volunteers' : 'Your Top Matches'}
        </h2>
        <button onClick={() => setActiveTab('matches')} style={{ color: '#0d9488', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '12px', padding: 0 }}>View All</button>
      </div>
      
      {/* CTA for new users without a profile - Friendly Starter Design */}
      {(!user.profile || Object.keys(user.profile).length === 0) && (
        <div style={{ 
          backgroundColor: '#f0fdfa', // Teal 50 - A bit of color
          border: '1px solid #ccfbf1', // Teal 100
          borderRadius: '8px', 
          padding: '20px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              backgroundColor: 'white', color: '#0d9488', // Teal 600
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#115e59' }}>
                Meet your community starters
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#334155', lineHeight: '1.4' }}>
                These volunteers are ready to help you get settled. <br/>
                <span style={{ opacity: 0.8 }}>Looking for shared interests? Complete your profile to find them.</span>
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/interview')}
            style={{
              backgroundColor: '#0f766e', // Teal 700
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(15, 118, 110, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#115e59'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0f766e'}
          >
            Find a Volunteer
          </button>
        </div>
      )}

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
          const isUnread = unreadMessageIds.includes(chat.id);
          
          return (
            <div key={chat.id} 
              onClick={() => {
                markAsRead(chat.id);
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
          const isUnread = unreadMessageIds.includes(chat.id);
          return (
            <div key={chat.id} 
              onClick={() => {
                markAsRead(chat.id);
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
  const ScheduleView = () => {
    const [schedulingStep, setSchedulingStep] = useState('list'); // 'list', 'select-volunteer', 'calendar', 'edit-details'
    const [selectedVolunteerForSchedule, setSelectedVolunteerForSchedule] = useState(null);
    const [editingVisitId, setEditingVisitId] = useState(null);
    const [editingVisit, setEditingVisit] = useState(null);

    // Mock initial visits
    const [visits, setVisits] = useState([
      { 
        id: 1, 
        volunteerName: 'Grace Okafor', 
        volunteerId: '13',
        date: '2025-12-12', 
        time: '10:00 AM', 
        activity: 'Coffee & Chat',
        location: 'At Home',
        color: 'green'
      },
      { 
        id: 2, 
        volunteerName: 'Henry Nakamura', 
        volunteerId: '14',
        date: '2025-12-15', 
        time: '2:00 PM', 
        activity: 'Chess Game',
        location: 'Community Center',
        color: 'blue'
      }
    ]);

    // Reset state when entering schedule view
    useEffect(() => {
      if (activeTab !== 'schedule') {
        setSchedulingStep('list');
        setSelectedVolunteerForSchedule(null);
        setEditingVisitId(null);
        setEditingVisit(null);
      }
    }, [activeTab]);

    const handleScheduleConfirm = (slot) => {
      if (editingVisitId) {
        // Update existing visit
        setVisits(prev => prev.map(v => {
          if (v.id === editingVisitId) {
            return { ...v, date: slot.date, time: slot.time };
          }
          return v;
        }));
        alert(`Rescheduled successfully with ${selectedVolunteerForSchedule.name} for ${slot.date} at ${slot.time}!`);
      } else {
        // Create new visit
        const newVisit = {
          id: Date.now(),
          volunteerName: selectedVolunteerForSchedule.name,
          volunteerId: selectedVolunteerForSchedule.id,
          date: slot.date,
          time: slot.time,
          activity: 'New Visit',
          location: 'TBD',
          color: 'blue'
        };
        setVisits(prev => [...prev, newVisit]);
        alert(`Scheduled successfully with ${selectedVolunteerForSchedule.name} for ${slot.date} at ${slot.time}!`);
      }
      
      setSchedulingStep('list');
      setSelectedVolunteerForSchedule(null);
      setEditingVisitId(null);
      setEditingVisit(null);
    };

    const handleSaveVisitDetails = () => {
      if (!editingVisit) return;
      
      setVisits(prev => prev.map(v => {
        if (v.id === editingVisit.id) {
          return editingVisit;
        }
        return v;
      }));
      
      alert('Visit details updated successfully!');
      setSchedulingStep('list');
      setEditingVisit(null);
      setEditingVisitId(null);
    };

    const handleDeleteVisit = (visitId) => {
      if (confirm('Are you sure you want to delete this visit?')) {
        setVisits(prev => prev.filter(v => v.id !== visitId));
        setSchedulingStep('list');
        setEditingVisit(null);
        setEditingVisitId(null);
      }
    };

    if (schedulingStep === 'edit-details' && editingVisit) {
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <button
              onClick={() => {
                setSchedulingStep('list');
                setEditingVisit(null);
                setEditingVisitId(null);
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b', display: 'flex', alignItems: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Edit Visit Details</h2>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '2rem', maxWidth: '600px' }}>
            {/* Activity Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                Activity Title
              </label>
              <input
                type="text"
                value={editingVisit.activity}
                onChange={(e) => setEditingVisit({ ...editingVisit, activity: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                placeholder="e.g., Coffee & Chat, Chess Game"
              />
            </div>

            {/* Location */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                Location
              </label>
              <input
                type="text"
                value={editingVisit.location}
                onChange={(e) => setEditingVisit({ ...editingVisit, location: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                placeholder="e.g., At Home, Community Center"
              />
            </div>

            {/* Date */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                Date
              </label>
              <input
                type="date"
                value={editingVisit.date}
                onChange={(e) => setEditingVisit({ ...editingVisit, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Time */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                Time
              </label>
              <input
                type="text"
                value={editingVisit.time}
                onChange={(e) => setEditingVisit({ ...editingVisit, time: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
                placeholder="e.g., 10:00 AM"
              />
            </div>

            {/* Volunteer Name (read-only) */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
                Volunteer
              </label>
              <div style={{
                padding: '10px 12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                {editingVisit.volunteerName}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
              <button
                onClick={() => handleDeleteVisit(editingVisit.id)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #dc2626',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#dc2626';
                }}
              >
                Delete Visit
              </button>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    setSchedulingStep('list');
                    setEditingVisit(null);
                    setEditingVisitId(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveVisitDetails}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0d9488',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (schedulingStep === 'calendar' && selectedVolunteerForSchedule) {
      return (
        <SchedulingCalendar
          volunteerId={selectedVolunteerForSchedule.id}
          volunteerName={selectedVolunteerForSchedule.name}
          onBack={() => {
            setSchedulingStep('list');
            setEditingVisitId(null);
          }}
          onSchedule={handleScheduleConfirm}
        />
      );
    }

    if (schedulingStep === 'select-volunteer') {
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <button
              onClick={() => setSchedulingStep('list')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b', display: 'flex', alignItems: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Select a Volunteer</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {matches.map(volunteer => (
              <div key={volunteer.id} onClick={() => {
                setSelectedVolunteerForSchedule(volunteer);
                setEditingVisitId(null); // Ensure we are in "create" mode
                setSchedulingStep('calendar');
              }}>
                <VolunteerCard volunteer={volunteer} />
              </div>
            ))}
            {matches.length === 0 && (
              <p style={{ color: '#64748b' }}>No matches found yet. Check your matches tab!</p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '20px', color: '#334155', fontWeight: '600', margin: 0 }}>Upcoming Visits</h2>
          <button 
            onClick={() => {
              setEditingVisitId(null);
              setSchedulingStep('select-volunteer');
            }}
            style={{ backgroundColor: '#0d9488', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>
            + Schedule New
          </button>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {visits.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No upcoming visits scheduled.</div>
          )}
          
          {visits.map((visit, index) => {
            // Helper to format date for the badge
            const dateObj = new Date(visit.date);
            const month = dateObj.toLocaleString('default', { month: 'short' });
            const day = dateObj.getDate() + 1; // Fix timezone offset issue for simple date strings if needed, or just parse string
            // Simple parse for YYYY-MM-DD
            const [y, m, d] = visit.date.split('-').map(Number);
            const dateDate = new Date(y, m - 1, d);
            const monthStr = dateDate.toLocaleString('default', { month: 'short' });
            const dayStr = dateDate.getDate();

            const isGreen = visit.color === 'green';
            const badgeBg = isGreen ? '#f0fdf4' : '#eff6ff';
            const badgeColor = isGreen ? '#16a34a' : '#2563eb';

            return (
              <div key={visit.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 16px', borderBottom: index !== visits.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ backgroundColor: badgeBg, color: badgeColor, padding: '6px 10px', borderRadius: '8px', textAlign: 'center', minWidth: '50px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>{monthStr}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1 }}>{dayStr}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '2px', fontSize: '14px' }}>{visit.activity} with {visit.volunteerName.split(' ')[0]}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{visit.time} • {visit.location}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => {
                      setEditingVisit({ ...visit });
                      setEditingVisitId(visit.id);
                      setSchedulingStep('edit-details');
                    }}
                    style={{ 
                      color: '#0d9488', 
                      background: 'none', 
                      border: '1px solid #0d9488', 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '12px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#0d9488';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#0d9488';
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                      // Find volunteer object to pass to calendar
                      const vol = matches.find(m => m.id === visit.volunteerId) || { id: visit.volunteerId, name: visit.volunteerName };
                      setSelectedVolunteerForSchedule(vol);
                      setEditingVisitId(visit.id);
                      setSchedulingStep('calendar');
                    }}
                    style={{ color: '#64748b', background: 'none', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    Reschedule
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Profile View Component
  const ProfileView = () => {
    const navigate = useNavigate();
    
    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [editBio, setEditBio] = useState('');
    const [editInterests, setEditInterests] = useState([]);
    const [editHelpNeeded, setEditHelpNeeded] = useState([]);
    const [editAvailabilityText, setEditAvailabilityText] = useState('');
    const [editAvailabilityChecks, setEditAvailabilityChecks] = useState({});
    const [showInterestModal, setShowInterestModal] = useState(false);
    
    // Helper to get profile data safely - these will update when user state changes
    const profile = user?.profile || {};
    const interests = profile.interests || [];
    const helpNeeded = profile.helpNeeded || [];
    const bio = profile.bio || "No bio added yet.";
    
    // Handle availability object
    const availability = profile.availability || {};
    const availabilityText = availability.text || "";
    const availabilityChecks = availability.checks || {};
    const activeChecks = Object.keys(availabilityChecks).filter(k => availabilityChecks[k]);

    // Color palette for bubbles
    const interestColors = [
      { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' },
      { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
      { bg: '#FEF3C7', text: '#A16207', border: '#FDE68A' },
      { bg: '#FCE7F3', text: '#BE185D', border: '#FBCFE8' },
      { bg: '#EDE9FE', text: '#6D28D9', border: '#DDD6FE' },
      { bg: '#FFE4E6', text: '#BE123C', border: '#FECDD3' }
    ];

    const CATEGORIZED_INTERESTS = {
      "Outdoors": ["Gardening", "Walking", "Nature", "Bird Watching"],
      "Indoors": ["Reading", "Cooking", "Baking", "Knitting"],
      "Social": ["Chess", "Board Games", "Conversation", "Tea/Coffee"],
      "Culture": ["Music", "Art", "History", "Movies"]
    };

    const HELP_CATEGORIES = [
      { id: 'companionship', label: 'Companionship', icon: '💬' },
      { id: 'tech', label: 'Tech Support', icon: '📱' },
      { id: 'hobbies', label: 'Hobbies Together', icon: '🎨' },
      { id: 'reading', label: 'Reading & Writing', icon: '📖' },
      { id: 'exercise', label: 'Gentle Exercise', icon: '🚶' }
    ];

    // Initialize edit state when entering edit mode
    const handleEditMode = () => {
      setEditBio(bio);
      setEditInterests([...interests]);
      setEditHelpNeeded([...helpNeeded]);
      setEditAvailabilityText(availabilityText);
      setEditAvailabilityChecks({...availabilityChecks});
      setIsEditing(true);
    };

    // Save changes
    const handleSaveProfile = async () => {
      const profileData = {
        bio: editBio,
        interests: editInterests,
        helpNeeded: editHelpNeeded,
        availability: {
          text: editAvailabilityText,
          checks: editAvailabilityChecks
        }
      };

      try {
        const response = await fetch('/api/users/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, profileData })
        });

        if (!response.ok) throw new Error('Failed to save profile');

        const data = await response.json();
        
        // Update localStorage and state
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        // Exit edit mode
        setIsEditing(false);
        
        // Show success message
        alert('Profile updated successfully! Your matches will be refreshed.');
      } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile. Please try again.");
      }
    };

    const toggleInterest = (interest) => {
      if (editInterests.includes(interest)) {
        setEditInterests(editInterests.filter(i => i !== interest));
      } else {
        setEditInterests([...editInterests, interest]);
      }
    };

    const toggleHelpNeeded = (category) => {
      if (editHelpNeeded.includes(category)) {
        setEditHelpNeeded(editHelpNeeded.filter(c => c !== category));
      } else {
        setEditHelpNeeded([...editHelpNeeded, category]);
      }
    };

    const toggleAvailability = (key) => {
      setEditAvailabilityChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Interest Selection Modal */}
        {showInterestModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
          }} onClick={() => setShowInterestModal(false)}>
            <div style={{
              backgroundColor: 'white', borderRadius: '12px', padding: '24px',
              width: '100%', maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Add Interests</h3>
                <button onClick={() => setShowInterestModal(false)} style={{ 
                  border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999' 
                }}>×</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(CATEGORIZED_INTERESTS).map(([category, items]) => (
                  <div key={category}>
                    <h4 style={{ 
                      margin: '0 0 8px 0', fontSize: '11px', 
                      color: '#999', 
                      textTransform: 'uppercase', fontWeight: '600', letterSpacing: '1px'
                    }}>
                      {category}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {items.map(interest => {
                        const isSelected = editInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            style={{
                              padding: '6px 12px', borderRadius: '20px',
                              border: isSelected ? '2px solid #1a1a1a' : '1px solid #ddd',
                              background: isSelected ? '#f0f0f0' : 'white',
                              fontSize: '13px', cursor: 'pointer',
                              fontWeight: isSelected ? '600' : '400'
                            }}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowInterestModal(false)}
                style={{
                  marginTop: '20px', width: '100%', padding: '10px',
                  background: '#1a1a1a', color: 'white', border: 'none',
                  borderRadius: '6px', fontSize: '13px', fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        <div style={{ 
          background: '#fff', 
          border: '1px solid #e0e0e0',
          padding: '40px'
        }}>
          {/* Name */}
          <h1 style={{ 
            fontSize: '26px', 
            fontWeight: '300', 
            margin: '0 0 32px 0',
            color: '#1a1a1a',
            letterSpacing: '-0.5px'
          }}>
            {user.name}
          </h1>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Contact */}
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#999', 
                marginBottom: '10px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                fontWeight: '600'
              }}>
                Contact
              </div>
              <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.7' }}>
                <div>{user.email || 'No email provided'}</div>
                {/* TODO: Add phone and location fields in future iteration */}
                {/* <div>{user.phone || 'No phone provided'}</div> */}
                {/* <div>{user.location || 'Location not specified'}</div> */}
              </div>
            </div>

            {/* About */}
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#999', 
                marginBottom: '10px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                fontWeight: '600'
              }}>
                About
              </div>
              {isEditing ? (
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  style={{
                    width: '100%', minHeight: '100px', padding: '12px',
                    fontSize: '14px', lineHeight: '1.6', color: '#333',
                    border: '1px solid #ddd', borderRadius: '6px',
                    fontFamily: 'inherit', resize: 'vertical'
                  }}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0
                }}>
                  {bio}
                </p>
              )}
            </div>

            {/* Interests */}
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#999', 
                marginBottom: '10px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Interests</span>
                {isEditing && (
                  <button
                    onClick={() => setShowInterestModal(true)}
                    style={{
                      background: 'none', border: 'none', color: '#1a1a1a',
                      fontSize: '11px', cursor: 'pointer', fontWeight: '600',
                      textTransform: 'uppercase', letterSpacing: '1px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(isEditing ? editInterests : interests).length > 0 ? (isEditing ? editInterests : interests).map((tag, i) => {
                  const colorScheme = interestColors[i % interestColors.length];
                  return (
                    <span key={i} style={{
                      fontSize: '13px',
                      color: colorScheme.text,
                      padding: '6px 14px',
                      background: colorScheme.bg,
                      borderRadius: '20px',
                      border: `1px solid ${colorScheme.border}`,
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {tag}
                      {isEditing && (
                        <button
                          onClick={() => setEditInterests(editInterests.filter(t => t !== tag))}
                          style={{
                            background: 'none', border: 'none', color: colorScheme.text,
                            fontSize: '14px', cursor: 'pointer', padding: 0, lineHeight: 1
                          }}
                        >
                          ×
                        </button>
                      )}
                    </span>
                  );
                }) : <span style={{ fontSize: '13px', color: '#999', fontStyle: 'italic' }}>No interests listed</span>}
              </div>
            </div>

            {/* Help Needed */}
            {(isEditing || helpNeeded.length > 0) && (
              <div>
                <div style={{ 
                  fontSize: '10px', 
                  color: '#999', 
                  marginBottom: '10px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1.5px',
                  fontWeight: '600'
                }}>
                  Looking For Help With
                </div>
                {isEditing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {HELP_CATEGORIES.map(cat => (
                      <label key={cat.id} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px', border: '1px solid #e0e0e0',
                        borderRadius: '6px', cursor: 'pointer',
                        background: editHelpNeeded.includes(cat.id) ? '#f8f8f8' : 'white'
                      }}>
                        <input
                          type="checkbox"
                          checked={editHelpNeeded.includes(cat.id)}
                          onChange={() => toggleHelpNeeded(cat.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>{cat.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {helpNeeded.map((help, i) => {
                      const colorScheme = interestColors[i % interestColors.length];
                      const category = HELP_CATEGORIES.find(c => c.id === help);
                      return (
                        <span key={i} style={{
                          fontSize: '13px',
                          color: colorScheme.text,
                          padding: '6px 14px',
                          background: colorScheme.bg,
                          borderRadius: '20px',
                          border: `1px solid ${colorScheme.border}`,
                          fontWeight: '500'
                        }}>
                          {category ? `${category.icon} ${category.label}` : help}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Availability */}
            <div>
              <div style={{ 
                fontSize: '10px', 
                color: '#999', 
                marginBottom: '10px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                fontWeight: '600'
              }}>
                Availability
              </div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editAvailabilityText}
                    onChange={(e) => setEditAvailabilityText(e.target.value)}
                    style={{
                      width: '100%', padding: '10px', marginBottom: '12px',
                      fontSize: '13px', border: '1px solid #ddd',
                      borderRadius: '6px', fontFamily: 'inherit'
                    }}
                    placeholder="e.g., Weekdays preferred, mornings work best"
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Weekends', 'Weekdays', 'Mornings', 'Afternoons', 'Evenings'].map(key => (
                      <label key={key} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '6px 12px', border: '1px solid #ddd',
                        borderRadius: '16px', cursor: 'pointer', fontSize: '12px',
                        background: editAvailabilityChecks[key] ? '#f0f0f0' : 'white',
                        fontWeight: editAvailabilityChecks[key] ? '600' : '400'
                      }}>
                        <input
                          type="checkbox"
                          checked={editAvailabilityChecks[key] || false}
                          onChange={() => toggleAvailability(key)}
                          style={{ cursor: 'pointer' }}
                        />
                        {key}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {availabilityText && (
                    <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px', fontWeight: '500' }}>
                      {availabilityText}
                    </div>
                  )}
                  {activeChecks.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeChecks.map((check, i) => {
                        const colorScheme = interestColors[i % interestColors.length];
                        return (
                          <span key={check} style={{
                            fontSize: '12px',
                            color: colorScheme.text,
                            padding: '4px 10px',
                            background: colorScheme.bg,
                            borderRadius: '16px',
                            border: `1px solid ${colorScheme.border}`,
                            fontWeight: '500'
                          }}>
                            {check}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {!availabilityText && activeChecks.length === 0 && (
                    <div style={{ fontSize: '13px', color: '#999', fontStyle: 'italic' }}>
                      No availability specified
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '8px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
              {isEditing ? (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleSaveProfile}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#1a1a1a', 
                      color: 'white',
                      border: 'none', 
                      borderRadius: '6px', 
                      fontSize: '13px', 
                      fontWeight: '500', 
                      cursor: 'pointer'
                    }}
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: 'transparent', 
                      color: '#666',
                      border: '1px solid #ddd', 
                      borderRadius: '6px', 
                      fontSize: '13px', 
                      fontWeight: '500', 
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={handleEditMode}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#1a1a1a', 
                        color: 'white',
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Edit Manually
                    </button>
                    <button 
                      onClick={() => navigate('/interview')}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#0d9488', 
                        color: 'white',
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                      </svg>
                      Update via Voice
                    </button>
                    <button 
                      onClick={() => navigate('/accessibility-setup')}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: 'transparent', 
                        color: '#666',
                        border: '1px solid #ddd', 
                        borderRadius: '6px', 
                        fontSize: '13px', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                      </svg>
                      Accessibility
                    </button>
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#999', 
                    fontStyle: 'italic',
                    padding: '8px 12px',
                    background: '#f8f8f8',
                    borderRadius: '6px',
                    border: '1px solid #f0f0f0'
                  }}>
                    💡 Tip: Updating your profile will refresh your volunteer matches to find better connections
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          SilverLink
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

      {/* Welcome Banner for First-Time Users */}
      {showWelcomeModal && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          maxWidth: '600px', width: 'calc(100% - 2rem)', zIndex: 2000,
          backgroundColor: 'white', border: '1px solid #e2e8f0',
          borderRadius: '12px', padding: '1.25rem 1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', gap: '1rem'
        }}>
          <div style={{ flex: 1 }}>
            <p style={{
              margin: '0 0 0.5rem 0', fontSize: '15px', color: '#1e293b',
              fontWeight: '500', lineHeight: '1.4'
            }}>
              {user?.name ? `Welcome, ${user.name}. ` : 'Welcome. '}Ready to get started?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  closeWelcomeModal();
                  setActiveTab('matches');
                }}
                style={{
                  padding: '6px 12px', backgroundColor: '#0d9488', color: 'white',
                  border: 'none', borderRadius: '6px', fontSize: '13px',
                  fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
              >
                Browse Matches
              </button>
              <button
                onClick={() => {
                  closeWelcomeModal();
                  setActiveTab('profile');
                }}
                style={{
                  padding: '6px 12px', backgroundColor: 'transparent', color: '#64748b',
                  border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px',
                  fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  closeWelcomeModal();
                  navigate('/accessibility-setup');
                }}
                style={{
                  padding: '6px 12px', backgroundColor: 'transparent', color: '#64748b',
                  border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px',
                  fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
              >
                Accessibility
              </button>
            </div>
          </div>
          <button
            onClick={closeWelcomeModal}
            style={{
              background: 'none', border: 'none', color: '#94a3b8',
              fontSize: '20px', cursor: 'pointer', padding: '4px',
              lineHeight: 1, flexShrink: 0
            }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
