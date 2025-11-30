import React from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

export default function ProfileDesignPreview() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '4rem' }}>
      <Header title="Refined Profile Concepts" showBack showHome />
      
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
        
        {/* --- FINAL SELECTION: Soft Neutral, No Indicator --- */}
        <section>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '14px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Selected Design
          </h2>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            padding: '1.5rem', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            maxWidth: '100%',
            margin: '0 auto',
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>My Preferences</h3>
              {/* TODO: Add "Visible" indicator here later. Options: Pill, Toggle, or Dot. */}
            </div>

            {/* Content (Soft Neutral) */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1.5rem', backgroundColor: '#F5F7FA', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px' }}>💭</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#546E7A' }}>My Goal</span>
                </div>
                <div style={{ paddingLeft: '28px', color: '#000000', fontSize: '14px', fontStyle: 'italic' }}>
                  "Excited to find a walking buddy and get some help with my iPad."
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '18px' }}>🎨</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Shared Interests</span>
                </div>
                <div style={{ paddingLeft: '30px', color: '#555', fontSize: '15px' }}>History, Painting, Audiobooks</div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '18px' }}>🤝</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Support Needed</span>
                </div>
                <div style={{ paddingLeft: '30px', color: '#555', fontSize: '15px' }}>iPad Tech Support</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '18px' }}>📅</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>Availability</span>
                </div>
                <div style={{ paddingLeft: '30px', color: '#555', fontSize: '15px' }}>Tuesday Mornings (10 AM)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: 'white', color: '#666', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>✏️ Edit Text</button>
              <button style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: '#E3F2FD', color: '#1565C0', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>🎤 Voice Edit</button>
            </div>
            <div style={{ marginTop: '1rem' }}>
               <Button variant="primary" fullWidth size="small">Save & Continue</Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
