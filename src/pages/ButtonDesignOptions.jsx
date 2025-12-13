import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';

// Sample volunteers for preview - with different status/experience combos
const sampleVolunteers = [
  {
    name: 'Maria Santos',
    icon: '👩‍🏫',
    role: 'Retired Librarian',
    bio: 'Books brought me to this country, and now I want to share that love of reading with others.',
    helpsWith: ['Companionship', 'Reading Together', 'Library Help'],
    languages: ['Portuguese', 'English', 'Spanish'],
    availability: 'Tue, Thu Mornings',
    isActive: true,
    yearsVolunteering: 4,
  },
  {
    name: 'Raj Patel',
    icon: '💻',
    role: 'Tech Helper',
    bio: 'Technology should make life easier, not harder. I\'m here to help bridge that gap.',
    helpsWith: ['Technology Help', 'Video Calls', 'Devices'],
    availability: 'Weekends',
    isActive: true,
    // No yearsVolunteering - chose not to share
  },
  {
    name: 'Fatima Hassan',
    icon: '🎨',
    role: 'Crafts & Conversation',
    bio: 'I believe everyone has a story worth hearing.',
    helpsWith: ['Companionship', 'Crafts', 'Light Cooking'],
    languages: ['Urdu', 'English'],
    availability: 'Mon, Wed, Fri Afternoons',
    isActive: false, // Not currently active
    yearsVolunteering: 2,
  },
];

// Badge Option A: Current design (Verified + Role tag)
function BadgeOptionA({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>
      <span>•</span>
      <span style={{ backgroundColor: '#E0F2F1', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>
        {volunteer.role}
      </span>
    </div>
  );
}

// Badge Option B: Active status + Experience (both optional)
function BadgeOptionB({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#666' }}>
          ★ {volunteer.yearsVolunteering} {volunteer.yearsVolunteering === 1 ? 'year' : 'years'}
        </span>
      )}
    </div>
  );
}

// Badge Option B2: Active + Experience with filled star
function BadgeOptionB2({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#F5A623' }}>
          ★ {volunteer.yearsVolunteering}y
        </span>
      )}
    </div>
  );
}

// Badge Option B3: Active + Experience with checkmark
function BadgeOptionB3({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#666' }}>
          ✦ {volunteer.yearsVolunteering} {volunteer.yearsVolunteering === 1 ? 'year' : 'years'}
        </span>
      )}
    </div>
  );
}

// Badge Option B4: Active + Experience with badge icon
function BadgeOptionB4({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '11px' }}>●</span> {volunteer.yearsVolunteering} {volunteer.yearsVolunteering === 1 ? 'year' : 'years'} exp
        </span>
      )}
    </div>
  );
}

// Badge Option B5: Active + Experience with just text
function BadgeOptionB5({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#888', fontStyle: 'italic' }}>
          {volunteer.yearsVolunteering}+ years
        </span>
      )}
    </div>
  );
}

// Badge Option B6: Active + Experience with diamond
function BadgeOptionB6({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
      {volunteer.isActive && (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active
        </span>
      )}
      {volunteer.isActive && volunteer.yearsVolunteering && <span>•</span>}
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#1565C0' }}>
          ◆ {volunteer.yearsVolunteering} {volunteer.yearsVolunteering === 1 ? 'year' : 'years'}
        </span>
      )}
    </div>
  );
}

// Badge Option C: Active status only
function BadgeOptionC({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
      {volunteer.isActive ? (
        <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
          Active now
        </span>
      ) : (
        <span style={{ color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CCC' }}></span>
          Away
        </span>
      )}
    </div>
  );
}

// Badge Option D: Experience only (as subtle tag)
function BadgeOptionD({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
      {volunteer.yearsVolunteering ? (
        <span style={{ backgroundColor: '#FFF8E1', padding: '2px 8px', borderRadius: '4px', color: '#F57C00', fontWeight: '500' }}>
          ⭐ {volunteer.yearsVolunteering} {volunteer.yearsVolunteering === 1 ? 'year' : 'years'} volunteering
        </span>
      ) : (
        <span style={{ backgroundColor: '#E3F2FD', padding: '2px 8px', borderRadius: '4px', color: '#1565C0', fontWeight: '500' }}>
          🆕 New volunteer
        </span>
      )}
    </div>
  );
}

// Badge Option E: Minimal - just active dot, no text
function BadgeOptionE({ volunteer }) {
  return (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
      <span 
        style={{ 
          width: '10px', 
          height: '10px', 
          borderRadius: '50%', 
          backgroundColor: volunteer.isActive ? '#4CAF50' : '#CCC',
          border: '2px solid white',
          boxShadow: '0 0 0 1px ' + (volunteer.isActive ? '#4CAF50' : '#CCC')
        }}
        title={volunteer.isActive ? 'Active' : 'Away'}
      ></span>
      {volunteer.yearsVolunteering && (
        <span style={{ color: '#888', fontSize: '12px' }}>
          {volunteer.yearsVolunteering}y exp
        </span>
      )}
    </div>
  );
}

// Card Preview Component
function CardPreview({ badgeComponent: BadgeComponent, label, volunteer }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '12px', 
          backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px', flexShrink: 0
        }}>
          {volunteer.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{volunteer.name}</h3>
          <BadgeComponent volunteer={volunteer} />
        </div>
      </div>

      {/* Bio */}
      <p style={{ 
        margin: '0 0 12px 0', fontSize: '13px', color: '#555', 
        fontStyle: 'italic', lineHeight: '1.4'
      }}>
        "{volunteer.bio}"
      </p>
      
      {/* Can Help With */}
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{volunteer.helpsWith.join(', ')}</p>
      </div>

      {/* Languages + Availability */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '12px', color: '#666', gap: '8px' }}>
        <span>{volunteer.languages ? `🗣️ ${volunteer.languages.join(', ')}` : '\u00A0'}</span>
        <span>📅 {volunteer.availability}</span>
      </div>

      {/* Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: '#00897B',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          View Profile
        </button>
      </div>
    </Card>
  );
}

export default function ButtonDesignOptions() {
  const badgeOptions = [
    { id: 'A', label: 'Current: Verified + Role', component: BadgeOptionA },
    { id: 'B', label: '★ Star symbol (outline)', component: BadgeOptionB },
    { id: 'B2', label: '★ Star (gold, shortened)', component: BadgeOptionB2 },
    { id: 'B3', label: '✦ Four-pointed star', component: BadgeOptionB3 },
    { id: 'B4', label: '● Dot + "exp"', component: BadgeOptionB4 },
    { id: 'B5', label: 'Text only (italic)', component: BadgeOptionB5 },
    { id: 'B6', label: '◆ Diamond (blue)', component: BadgeOptionB6 },
    { id: 'C', label: 'Active Status Only', component: BadgeOptionC },
    { id: 'D', label: 'Experience Tag Only', component: BadgeOptionD },
    { id: 'E', label: 'Minimal (dot + years)', component: BadgeOptionE },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Badge Design Options" showHome />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* Instructions */}
        <div style={{ 
          backgroundColor: '#FFF3E0', 
          padding: '1rem 1.5rem', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          border: '1px solid #FFE0B2'
        }}>
          <p style={{ margin: 0, color: '#E65100', fontSize: '14px' }}>
            🎨 <strong>Choose a badge style:</strong> Each row shows how the badge looks with 3 different volunteers (with varying data).
            <br />• Maria: Active + 4 years experience
            <br />• Raj: Active + no experience shared  
            <br />• Fatima: Not active + 2 years experience
          </p>
        </div>

        {/* Options */}
        {badgeOptions.map(option => (
          <div key={option.id} style={{ marginBottom: '2rem' }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              color: '#1565C0',
              padding: '8px 12px',
              backgroundColor: '#E3F2FD',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'inline-block'
            }}>
              Option {option.id}: {option.label}
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem'
            }}>
              {sampleVolunteers.map(volunteer => (
                <CardPreview 
                  key={volunteer.name}
                  label={option.label}
                  badgeComponent={option.component}
                  volunteer={volunteer}
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
