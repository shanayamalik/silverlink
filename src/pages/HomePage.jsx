import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import VolunteerCard from "../components/VolunteerCard";
import VolunteerComparison from "../components/VolunteerComparison";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '0 0 2rem 0' }}>
      
        {/* --- TOP NAVIGATION (Linear Style) --- */}
        <nav style={{ 
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', 
          padding: '1rem 0', marginBottom: '1rem' 
        }}>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* TODO: Implement welcome message later */}
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', 
                  color: '#666', cursor: 'pointer', padding: '0.4rem 0.8rem'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{ 
                  background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', 
                  color: 'var(--color-text-main)', cursor: 'pointer', padding: '0.4rem 0.8rem'
                }}
              >
                Log In
              </button>
              <Button 
                variant="primary" 
                size="small" 
                onClick={() => navigate('/signup')}
                style={{ fontSize: '13px', padding: '0.4rem 1rem', minHeight: '32px' }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>

        {/* --- HERO: Warm & Personal --- */}
        <header style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
          <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '1.5rem'
            }}>
              👋
          </div>
          <h1 style={{ color: 'var(--color-text-main)', marginBottom: '1rem', fontSize: '42px', letterSpacing: '-0.5px' }}>
            Welcome to SilverGuide
          </h1>
          <p style={{ fontSize: '16px', color: '#333', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            A safe, friendly space where seniors can connect with trusted volunteers for companionship, conversation, and everyday support.
          </p>
        </header>

        {/* --- PROCESS: How it Works --- */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2rem', fontWeight: '700' }}>
            How it Works
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '220px' }}>
              <div style={{ width: '64px', height: '64px', background: '#E0F2F1', borderRadius: '20px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#00695C', fontWeight: 'bold' }}>1</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0.75rem' }}>Sign Up</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.5' }}>Create a free profile to tell us what you need or what you can share.</p>
            </div>
            <div style={{ textAlign: 'center', maxWidth: '220px' }}>
              <div style={{ width: '64px', height: '64px', background: '#E3F2FD', borderRadius: '20px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#1565C0', fontWeight: 'bold' }}>2</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0.75rem' }}>Browse</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.5' }}>Find friendly volunteers or seniors in your local community.</p>
            </div>
            <div style={{ textAlign: 'center', maxWidth: '220px' }}>
              <div style={{ width: '64px', height: '64px', background: '#F3E5F5', borderRadius: '20px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#7B1FA2', fontWeight: 'bold' }}>3</div>
              <h3 style={{ fontSize: '18px', marginBottom: '0.75rem' }}>Connect</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.5' }}>Chat safely and meet up for help, hobbies, or conversation.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
