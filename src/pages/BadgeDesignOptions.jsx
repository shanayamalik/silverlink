import React, { useState } from 'react';

const BadgeDesignOptions = () => {
  const [activeTab, setActiveTab] = useState('A');

  const tabs = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Mini volunteer card preview
  const MiniVolunteerCard = ({ name, icon, role, badge }) => (
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
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
          <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1f2937' }}>{name}</span>
          {badge}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{role}</div>
      </div>
      <button style={{
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

  // Badge variations
  const badges = {
    A: <span style={{ fontSize: '0.7rem', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '3px' }}>
      🛡️ Verified
    </span>,
    B: <span style={{ fontSize: '0.7rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px' }}>
      ✓ Verified Helper
    </span>,
    C: <span style={{ 
      fontSize: '0.65rem', 
      color: '#0d9488', 
      background: '#f0fdfa',
      border: '1px solid #99f6e4',
      borderRadius: '9999px',
      padding: '2px 8px',
      display: 'flex', 
      alignItems: 'center', 
      gap: '3px' 
    }}>
      🛡️ Verified
    </span>,
    D: <span style={{ 
      fontSize: '0.65rem', 
      color: '#7c3aed', 
      background: '#f5f3ff',
      border: '1px solid #ddd6fe',
      borderRadius: '9999px',
      padding: '2px 8px',
      display: 'flex', 
      alignItems: 'center', 
      gap: '3px' 
    }}>
      💜 Trusted
    </span>,
    E: <span style={{ fontSize: '0.7rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '3px' }}>
      ✦ Trusted Volunteer
    </span>,
    F: <span style={{ 
      fontSize: '0.65rem', 
      color: '#059669', 
      background: '#ecfdf5',
      border: '1px solid #a7f3d0',
      borderRadius: '4px',
      padding: '2px 6px',
      display: 'flex', 
      alignItems: 'center', 
      gap: '3px',
      fontWeight: '500'
    }}>
      ✓ Verified
    </span>,
  };

  const descriptions = {
    A: 'Shield emoji + "Verified" in teal (no background)',
    B: 'Checkmark + "Verified Helper" in gray (subtle)',
    C: 'Shield emoji + "Verified" in teal pill',
    D: 'Heart + "Trusted" in purple pill',
    E: 'Star symbol + "Trusted Volunteer" in blue (no background)',
    F: 'Checkmark + "Verified" in green rounded badge',
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Trust Badge Options</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Verification/trust badges shown next to volunteer names
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

      {/* Preview */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>
          <strong>Option {activeTab}:</strong> {descriptions[activeTab]}
        </p>

        {/* Volunteer Cards Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <MiniVolunteerCard 
            name="Maria Santos" 
            icon="👩‍🏫" 
            role="Retired Librarian" 
            badge={badges[activeTab]}
          />
          <MiniVolunteerCard 
            name="Raj Patel" 
            icon="💻" 
            role="Tech Helper" 
            badge={badges[activeTab]}
          />
          <MiniVolunteerCard 
            name="Fatima Hassan" 
            icon="🎨" 
            role="Crafts & Conversation" 
            badge={badges[activeTab]}
          />
        </div>
      </div>

      {/* Quick Summary */}
      <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>
        <strong>Summary:</strong><br/>
        A = 🛡️ teal text · B = ✓ gray text · C = 🛡️ teal pill · D = 💜 purple pill · E = ✦ blue text · F = ✓ green badge
      </div>
    </div>
  );
};

export default BadgeDesignOptions;
