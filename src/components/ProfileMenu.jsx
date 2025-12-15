import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileMenu({ userName = 'Demo User', userEmail = 'demo.user@gmail.com' }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const MenuItem = ({ icon, text, onClick, danger = false }) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        color: danger ? '#dc2626' : '#1f2937',
        transition: 'background-color 0.15s',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = danger ? '#fef2f2' : '#f9fafb'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <span style={{ 
        display: 'flex', 
        alignItems: 'center',
        color: danger ? '#dc2626' : '#64748b'
      }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{text}</span>
    </button>
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Profile Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: '#fff',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: showMenu ? '0 0 0 2px #0d9488' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!showMenu) e.currentTarget.style.borderColor = '#d1d5db';
        }}
        onMouseLeave={(e) => {
          if (!showMenu) e.currentTarget.style.borderColor = '#e5e7eb';
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {userName.charAt(0)}
        </div>
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#1f2937'
        }}>
          {userName.split(' ')[0]}
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#6b7280" 
          strokeWidth="2"
          style={{
            transition: 'transform 0.2s',
            transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 12px)',
          right: 0,
          width: '300px',
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px', 
            borderBottom: '1px solid #f3f4f6',
            background: 'linear-gradient(to bottom, #f9fafb, #fff)'
          }}>
            <div style={{ 
              fontSize: '15px', 
              fontWeight: '600', 
              color: '#1f2937',
              marginBottom: '4px'
            }}>
              {userName}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              {userEmail}
            </div>
          </div>

          {/* Main Items */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>} 
              text="Profile" 
              onClick={() => {
                setShowMenu(false);
                // Navigate to dashboard and set active tab to profile via state
                navigate('/dashboard', { state: { activeTab: 'profile' } });
              }}
            />
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} 
              text="Schedule" 
              onClick={() => {
                setShowMenu(false);
                // Navigate to dashboard and set active tab to schedule via state
                navigate('/dashboard', { state: { activeTab: 'schedule' } });
              }}
            />
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>} 
              text="Messages" 
              onClick={() => {
                setShowMenu(false);
                // Navigate to dashboard and set active tab to messages via state
                navigate('/dashboard', { state: { activeTab: 'messages' } });
              }}
            />
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>} 
              text="Matches" 
              onClick={() => {
                setShowMenu(false);
                // Navigate to dashboard and set active tab to matches via state
                navigate('/dashboard', { state: { activeTab: 'matches' } });
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>

          {/* Settings Section */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>} 
              text="Settings" 
              onClick={() => {
                setShowMenu(false);
                // Navigate to dashboard and set active tab to profile via state (settings including accessibility are in profile)
                navigate('/dashboard', { state: { activeTab: 'profile' } });
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>

          {/* Support */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>} 
              text="Help" 
              onClick={() => {
                setShowMenu(false);
                navigate('/help-center-preview');
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>

          {/* Sign Out */}
          <div style={{ padding: '8px 0' }}>
            <MenuItem 
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>} 
              text="Sign Out" 
              onClick={handleLogout}
              danger={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
