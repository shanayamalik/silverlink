import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetQuestion = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/auth/security-question?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        setSecurityQuestion(data.question);
        setStep(2);
      } else {
        setError(data.message || 'User not found');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, securityAnswer, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Unable to connect to server');
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
      
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '0.5rem', color: '#111', fontWeight: '700', textAlign: 'left' }}>
          {step === 1 ? 'Reset Password' : step === 2 ? 'Security Check' : 'Success!'}
        </h1>
        
        <p style={{ marginBottom: '2rem', color: '#666', fontSize: '16px', textAlign: 'left' }}>
          {step === 1 && 'Enter your email to find your account.'}
          {step === 2 && 'Answer your security question to reset your password.'}
          {step === 3 && 'Your password has been updated.'}
        </p>

        {error && (
          <div style={{ 
            backgroundColor: '#FFF5F5', color: '#E53E3E', padding: '12px', 
            borderRadius: '6px', marginBottom: '1.5rem', fontSize: '14px', border: '1px solid #FED7D7'
          }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleGetQuestion}>
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: '#333' }}>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 0', borderRadius: '0', border: 'none',
                  borderBottom: '1px solid #E2E8F0', fontSize: '16px', outline: 'none',
                  backgroundColor: 'transparent', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                placeholder="jane@example.com"
                required
              />
            </div>
            <Button type="submit" variant="primary" fullWidth size="large" disabled={isLoading}
              style={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px', height: '48px', fontWeight: '600' }}>
              {isLoading ? 'Searching...' : 'Next'}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: '#666' }}>Security Question</label>
              <div style={{ fontSize: '16px', color: '#111', fontWeight: '600' }}>{securityQuestion}</div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: '#333' }}>Answer</label>
              <input 
                type="text" 
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 0', borderRadius: '0', border: 'none',
                  borderBottom: '1px solid #E2E8F0', fontSize: '16px', outline: 'none',
                  backgroundColor: 'transparent', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                required
              />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500', color: '#333' }}>New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 0', borderRadius: '0', border: 'none',
                  borderBottom: '1px solid #E2E8F0', fontSize: '16px', outline: 'none',
                  backgroundColor: 'transparent', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = '#333'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E2E8F0'}
                required
              />
            </div>

            <Button type="submit" variant="primary" fullWidth size="large" disabled={isLoading}
              style={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px', height: '48px', fontWeight: '600' }}>
              {isLoading ? 'Updating...' : 'Reset Password'}
            </Button>
          </form>
        )}

        {step === 3 && (
          <div>
            <Button onClick={() => navigate('/login')} variant="primary" fullWidth size="large"
              style={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px', height: '48px', fontWeight: '600' }}>
              Back to Login
            </Button>
          </div>
        )}

        {step !== 3 && (
          <div style={{ marginTop: '1.5rem', fontSize: '14px', color: '#666', textAlign: 'left' }}>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#0056b3', fontWeight: '600', cursor: 'pointer', padding: 0 }}>
              Back to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
