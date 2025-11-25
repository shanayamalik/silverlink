import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/volunteers');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to the server. Please ensure the backend is running (npm run server).');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#FFFFFF',
      padding: '2rem'
    }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          marginBottom: '0.5rem', 
          color: '#111', 
          fontWeight: '700',
          textAlign: 'left'
        }}>Welcome Back!</h1>
        
        <p style={{ 
          marginBottom: '2rem', 
          color: '#666', 
          fontSize: '16px',
          textAlign: 'left'
        }}>
          Please enter your details.
        </p>

        {error && (
          <div style={{ 
            backgroundColor: '#FFF5F5', 
            color: '#E53E3E', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '1.5rem', 
            fontSize: '14px',
            border: '1px solid #FED7D7'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: '#333' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 0', 
                borderRadius: '0', 
                border: 'none',
                borderBottom: '1px solid #E2E8F0', 
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'transparent',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderBottomColor = '#333'}
              onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
              placeholder="jane@example.com"
              required
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>Password</label>
              <button onClick={() => navigate('/recover-password')} style={{ background: 'none', border: 'none', fontSize: '14px', color: '#0056b3', textDecoration: 'none', cursor: 'pointer', padding: 0 }}>Forgot password?</button>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 0', 
                borderRadius: '0', 
                border: 'none',
                borderBottom: '1px solid #E2E8F0', 
                fontSize: '16px',
                outline: 'none',
                backgroundColor: 'transparent',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderBottomColor = '#333'}
              onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
              required
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            size="large" 
            style={{ 
              marginBottom: '1.5rem', 
              backgroundColor: '#000', 
              color: '#fff', 
              borderRadius: '8px',
              height: '48px',
              fontWeight: '600'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '14px', color: '#666', textAlign: 'left' }}>
          Don't have an account? <button onClick={() => navigate('/preferences')} style={{ background: 'none', border: 'none', color: '#0056b3', fontWeight: '600', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>Sign Up</button>
        </div>

      </div>
    </div>
  );
}
