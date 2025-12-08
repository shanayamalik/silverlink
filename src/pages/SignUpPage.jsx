import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('What is your mother\'s maiden name?');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, securityQuestion, securityAnswer }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/preferences');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
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
      padding: '1rem'
    }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: '360px' 
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          marginBottom: '0.25rem', 
          color: '#111', 
          fontWeight: '700',
          textAlign: 'left'
        }}>
          {step === 1 ? 'Create Account' : 'Set Security Question'}
        </h1>
        
        <p style={{ 
          marginBottom: '1.5rem', 
          color: '#666', 
          fontSize: '15px',
          textAlign: 'left'
        }}>
          {step === 1 ? 'Join SilverGuide today.' : 'This helps you recover your account if you forget your password.'}
        </p>

        {error && (
          <div style={{ 
            backgroundColor: '#FFF5F5', 
            color: '#E53E3E', 
            padding: '10px', 
            borderRadius: '6px', 
            marginBottom: '1rem', 
            fontSize: '13px',
            border: '1px solid #FED7D7'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={step === 1 ? handleNextStep : handleSignUp}>
          
          {step === 1 && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '13px', fontWeight: '500', color: '#333' }}>Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 0', 
                    borderRadius: '0', 
                    border: 'none',
                    borderBottom: '1px solid #E2E8F0', 
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '13px', fontWeight: '500', color: '#333' }}>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 0', 
                    borderRadius: '0', 
                    border: 'none',
                    borderBottom: '1px solid #E2E8F0', 
                    fontSize: '15px',
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

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '13px', fontWeight: '500', color: '#333' }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 0', 
                    borderRadius: '0', 
                    border: 'none',
                    borderBottom: '1px solid #E2E8F0', 
                    fontSize: '15px',
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
                size="medium" 
                style={{ 
                  marginBottom: '1rem', 
                  backgroundColor: '#000', 
                  color: '#fff', 
                  borderRadius: '8px',
                  height: '44px',
                  fontWeight: '600'
                }}
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '13px', fontWeight: '500', color: '#333' }}>Security Question</label>
                <select
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 0', 
                    borderRadius: '0', 
                    border: 'none',
                    borderBottom: '1px solid #E2E8F0', 
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    transition: 'border-color 0.2s',
                    color: '#333',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                >
                  <option>What is your mother's maiden name?</option>
                  <option>What was the name of your first pet?</option>
                  <option>What city were you born in?</option>
                  <option>What is your favorite book?</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '13px', fontWeight: '500', color: '#333' }}>Security Answer</label>
                <input 
                  type="text" 
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '8px 0', 
                    borderRadius: '0', 
                    border: 'none',
                    borderBottom: '1px solid #E2E8F0', 
                    fontSize: '15px',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                  placeholder="Answer"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                size="medium" 
                style={{ 
                  marginBottom: '1rem', 
                  backgroundColor: '#000', 
                  color: '#fff', 
                  borderRadius: '8px',
                  height: '44px',
                  fontWeight: '600'
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              
              <div style={{ textAlign: 'center' }}>
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  style={{ background: 'none', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', padding: '0.5rem' }}
                >
                  Back
                </button>
              </div>
            </>
          )}
        </form>

        {step === 1 && (
          <div style={{ marginTop: '1rem', fontSize: '13px', color: '#666', textAlign: 'left' }}>
            Already have an Account? <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#0056b3', fontWeight: '600', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>Log In</button>
          </div>
        )}

      </div>
    </div>
  );
}
