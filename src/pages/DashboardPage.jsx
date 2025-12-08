import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerCard from '../components/VolunteerCard';
import { mockVolunteers } from '../data/mockVolunteers';
import { matchVolunteers } from '../utils/matching';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [readMessages, setReadMessages] = useState(() => {
    const saved = localStorage.getItem('readMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.profile) {
        setMatches(matchVolunteers(mockVolunteers, parsedUser.profile, { maxResults: 3 }));
      }
    }
  }, []);

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
    { id: 101, name: 'Community Support', date: '2 days ago', message: 'Your weekly schedule is confirmed.', avatar: '🤝' },
    { id: 102, name: 'Sarah Jenkins', date: '3 days ago', message: 'I can bring the groceries.', avatar: '🥬' }
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
    // Calculate unread count based on state
    const unreadCount = recentChats.filter(chat => (chat.id === 14 || chat.id === 15) && !readMessages.includes(chat.id)).length;
    
    const stats = [
      { label: 'New Matches', value: matches.length, icon: '🤝' },
      { label: 'Unread Messages', value: unreadCount, icon: '💬' },
      { label: 'Upcoming Visits', value: '0', icon: '📅' }
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
        <button onClick={() => navigate('/volunteers')} style={{ color: '#0d9488', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '12px', padding: 0 }}>View All</button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {matches.map((volunteer, i) => (
          <div key={volunteer.id} style={{ height: '100%' }}>
            <VolunteerCard volunteer={volunteer} onViewProfile={() => navigate('/volunteers')} />
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
        <button style={{ color: '#0d9488', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer', fontSize: '12px', padding: 0 }}>View All</button>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {recentChats.map((chat, i) => {
          // Default unread: Henry (14) and Patricia (15) unless marked as read
          const isUnread = (chat.id === 14 || chat.id === 15) && !readMessages.includes(chat.id);
          
          return (
            <div key={chat.id} 
              onClick={() => {
                // Mark as read
                if (isUnread) {
                  const newReadMessages = [...readMessages, chat.id];
                  setReadMessages(newReadMessages);
                  localStorage.setItem('readMessages', JSON.stringify(newReadMessages));
                }
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
          <span style={{ fontSize: '24px' }}>👵</span> SilverGuide
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
            { id: 'matches', icon: '🤝', label: 'My Matches' },
            { id: 'messages', icon: '💬', label: 'Messages' },
            { id: 'profile', icon: '👤', label: 'Profile' }
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
                color: activeTab === item.id ? sidebarStyles.activeText : '#94a3b8',
                transition: 'all 0.2s',
                boxShadow: activeTab === item.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ padding: '1rem', borderRadius: '8px', backgroundColor: '#334155' }}>
            <div style={{ fontSize: '12px', marginBottom: '4px', color: '#94a3b8' }}>Signed in as</div>
            <div style={{ fontWeight: '600', fontSize: '14px' }}>{user.name}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <WelcomeBanner />
          <StatsSection />
          
          {/* Hybrid Grid: Matches (Cards) + Messages (List) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <MatchesSection />
            <MessagesSection />
          </div>
        </div>
      </div>

    </div>
  );
}
