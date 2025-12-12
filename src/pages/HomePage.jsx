import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useNavigate } from 'react-router-dom';

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
                    <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            color: '#111827'
          }}>
            Welcome to <span style={{ color: 'var(--color-primary)' }}>SilverLink</span>
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

          {/* TODO: Re-enable if we need a bottom CTA. Currently relying on top-right Sign Up button to keep page compact.
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" size="large" onClick={() => navigate('/preferences')} style={{ padding: '1rem 3rem', fontSize: '18px' }}>
              Join the Community
            </Button>
          </div>
          */}
        </section>

      </div>
    </div>
  );
}

/* 
// --- PREVIOUS DESIGN PREVIEW (COMMENTED OUT) ---

export function DesignPreview() {
  return (
    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>Welcome to SilverLink</h1>
      <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Connecting seniors with friendly volunteers for conversation, hobbies, and help.
      </p>
      
      <section style={{ marginBottom: '4rem', textAlign: 'left' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Volunteer Card Concepts</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Exploring different ways to present volunteer info to avoid the "dating app" feel.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <Card variant="border" hoverable hoverEffect="glow">
             <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '12px', 
                backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '30px'
              }}>
                🌿
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Sarah Jenkins</h3>
                <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
                  <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>
                  <span>•</span>
                  <span style={{ backgroundColor: 'var(--color-success)', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>Retired Nurse</span>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem', padding: '12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
              <p style={{ margin: 0, fontWeight: '600' }}>Gardening, Recipe Swapping</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#666', marginBottom: '1rem' }}>
              <span>📅 Mon, Wed Mornings</span>
            </div>

            <Button size="medium" variant="primary" fullWidth>Request Help</Button>
          </Card>

          <Card variant="tint" hoverable hoverEffect="lift">
             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '50%', 
                backgroundColor: '#FFE0B2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', border: '2px solid white'
              }}>
                📚
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Robert Chen</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Retired History Teacher</p>
              </div>
            </div>
            
            <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem', lineHeight: '1.4' }}>
              "I miss the classroom and love sharing stories about local history with new friends."
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #eee' }}>🗣️ Mandarin/English</span>
              <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #eee' }}>♟️ Chess</span>
            </div>

            <Button size="medium" variant="primary" fullWidth>Chat with Robert</Button>
          </Card>

          <Card variant="shadow" hoverable hoverEffect="fill">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Emily Davis</h3>
                <span style={{ fontSize: '12px', padding: '2px 6px', backgroundColor: '#E3F2FD', color: '#1565C0', borderRadius: '4px', fontWeight: 'bold' }}>
                  Tech Savvy
                </span>
              </div>
              <div style={{ fontSize: '24px' }}>💻</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}><b>Former IT Specialist</b> who is patient and a good listener.</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888' }}>SKILLS</p>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '14px', color: '#444' }}>
                <li>Setting up Zoom calls</li>
                <li>Email & Password help</li>
                <li>iPad basics</li>
              </ul>
            </div>

            <Button size="medium" variant="secondary" fullWidth>Request Help</Button>
          </Card>

        </div>
      </section>
    </div>
  );
}
*/

