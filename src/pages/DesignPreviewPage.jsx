import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function DesignPreviewPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>Design Preview</h1>
      <section style={{ marginBottom: '4rem', textAlign: 'left', marginTop: '3rem' }}>
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
