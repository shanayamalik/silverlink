import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - just navigate to dashboard or volunteers page
    navigate('/volunteers');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#F7F9FC', // Light gray background like Stripe
      padding: '2rem'
    }}>
      
      {/* Logo / Brand */}
      <div style={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '24px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)' }}></div>
        SilverGuide
      </div>

      {/* Login Card */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)', // Subtle shadow
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h1 style={{ fontSize: '24px', marginBottom: '2rem', color: '#333' }}>Sign in to your account</h1>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '600', color: '#444' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #E0E0E0', 
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="jane@example.com"
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>Password</label>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                borderRadius: '6px', 
                border: '1px solid #E0E0E0', 
                fontSize: '16px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          <Button variant="primary" fullWidth size="large" style={{ marginBottom: '1.5rem' }}>
            Sign In
          </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E0E0E0' }}></div>
          <span style={{ padding: '0 10px', color: '#888', fontSize: '14px' }}>Or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E0E0E0' }}></div>
        </div>

        {/* Google Sign In Mock */}
        <button style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: 'white', 
          border: '1px solid #E0E0E0', 
          borderRadius: '6px', 
          fontSize: '15px', 
          fontWeight: '600', 
          color: '#333', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9F9F9'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <span style={{ fontSize: '18px' }}>G</span> Sign in with Google
        </button>

      </div>

      <div style={{ marginTop: '2rem', fontSize: '15px', color: '#666' }}>
        New to SilverGuide? <button onClick={() => navigate('/preferences')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer', padding: 0 }}>Create account</button>
      </div>

    </div>
  );
}
