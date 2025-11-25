import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, showBack, showHome }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem', 
      backgroundColor: 'white', 
      borderBottom: '1px solid #E0E0E0',
      height: '70px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '120px' }}>
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: '#555'
            }}
          >
            <span>←</span> Back
          </button>
        )}
        {showHome && (
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: '#555'
            }}
          >
            <span>🏠</span> Home
          </button>
        )}
      </div>
      
      <h1 style={{ fontSize: '20px', margin: 0, color: '#333', fontWeight: '600' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px', justifyContent: 'flex-end' }}>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary)', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '16px', color: '#555' }}>
              Welcome, <strong>{user.name}</strong>
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
