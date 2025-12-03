import React, { useState } from 'react';

const BannerDesignOptions = () => {
  const [activeTab, setActiveTab] = useState('A');

  const tabs = ['A', 'B', 'C', 'D', 'E', 'F'];

  const volunteerCount = 3;

  // Mini volunteer card preview
  const MiniVolunteerCard = ({ name, icon, role }) => (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      padding: '0.875rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <div>
        <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>{name}</div>
        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{role}</div>
      </div>
      <button style={{
        marginLeft: 'auto',
        padding: '0.35rem 0.75rem',
        background: '#0d9488',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.75rem',
        cursor: 'pointer'
      }}>
        View Profile
      </button>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Banner Design Options</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Minimalist bubble styles - balancing visibility with simplicity
      </p>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.4rem 0.9rem',
              border: activeTab === tab ? '2px solid #0d9488' : '1px solid #e0e0e0',
              borderRadius: '6px',
              background: activeTab === tab ? '#0d9488' : 'white',
              color: activeTab === tab ? 'white' : '#333',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.85rem'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Page Preview */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* Option A: Light teal bubble - minimal */}
        {activeTab === 'A' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option A:</strong> Light teal bubble, simple text
            </p>
            <div style={{
              background: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              color: '#0f766e'
            }}>
              {volunteerCount} volunteers match your preferences
            </div>
          </>
        )}

        {/* Option B: Light gray bubble with teal number */}
        {activeTab === 'B' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option B:</strong> Gray bubble, teal number accent
            </p>
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              color: '#4b5563'
            }}>
              <span style={{ color: '#0d9488', fontWeight: '600' }}>{volunteerCount}</span> volunteers match your preferences
            </div>
          </>
        )}

        {/* Option C: Teal left border + light background */}
        {activeTab === 'C' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option C:</strong> Teal left border with subtle background
            </p>
            <div style={{
              background: '#f9fafb',
              borderLeft: '3px solid #0d9488',
              borderRadius: '0 6px 6px 0',
              padding: '0.7rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              color: '#374151'
            }}>
              {volunteerCount} volunteers match your preferences
            </div>
          </>
        )}

        {/* Option D: White card with subtle shadow */}
        {activeTab === 'D' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option D:</strong> White card with soft shadow
            </p>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              color: '#374151',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <span style={{ color: '#0d9488', fontWeight: '600' }}>{volunteerCount}</span> volunteers match your preferences
            </div>
          </>
        )}

        {/* Option E: Compact teal pill centered */}
        {activeTab === 'E' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option E:</strong> Centered compact pill
            </p>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{
                display: 'inline-block',
                background: '#f0fdfa',
                border: '1px solid #99f6e4',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                color: '#0f766e'
              }}>
                {volunteerCount} matches found
              </span>
            </div>
          </>
        )}

        {/* Option F: Icon + text bubble */}
        {activeTab === 'F' && (
          <>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.75rem' }}>
              <strong>Option F:</strong> Checkmark icon + bubble
            </p>
            <div style={{
              background: '#f0fdfa',
              border: '1px solid #99f6e4',
              borderRadius: '8px',
              padding: '0.65rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
              color: '#0f766e',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ color: '#0d9488' }}>✓</span>
              {volunteerCount} volunteers match your preferences
            </div>
          </>
        )}

        {/* Volunteer Cards Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <MiniVolunteerCard name="Maria Santos" icon="👩‍🏫" role="Retired Librarian" />
          <MiniVolunteerCard name="Raj Patel" icon="💻" role="Tech Helper" />
          <MiniVolunteerCard name="Fatima Hassan" icon="🎨" role="Crafts & Conversation" />
        </div>

      </div>

      {/* Quick Summary */}
      <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
        <strong>Summary:</strong>
        <span style={{ marginLeft: '0.5rem' }}>
          A = teal bubble · B = gray + teal # · C = left border + bg · D = white shadow · E = centered pill · F = ✓ icon
        </span>
      </div>
    </div>
  );
};

export default BannerDesignOptions;
