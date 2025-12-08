import React from 'react';
import Card from './common/Card';

/**
 * VolunteerCard Component
 * Displays volunteer information in the "Compact Row" style.
 * 
 * Shows: Name, icon, verified badge, shared interests,
 *        "Can help with", languages, and availability.
 * 
 * Extended profile (modal) shows: Full about me, skills list,
 *        detailed availability, age range.
 * 
 * @param {Object} props
 * @param {Object} props.volunteer - Volunteer data object
 * @param {function} props.onViewProfile - Handler for "View Profile" button
 * @param {boolean} props.selected - Whether the card is selected
 */
export default function VolunteerCard({ volunteer, onViewProfile, selected }) {
  if (!volunteer) return null;

  const { 
    name, 
    icon,
    sharedInterests = [],
    helpsWith = [],
    languages = [],
    availability
  } = volunteer;

  return (
    <Card 
      variant="border" 
      hoverable 
      hoverEffect="glow"
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: selected ? '2px solid #1565C0' : undefined,
        backgroundColor: selected ? '#F5F9FF' : undefined
      }}
    >
      {/* Header: Icon + Name + Status/Experience */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '12px', 
          backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px', flexShrink: 0
        }}>
          {icon || '👤'}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
          <span style={{ 
            fontSize: '0.6rem', 
            color: '#059669', 
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '4px',
            padding: '2px 6px',
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '3px',
            fontWeight: '500'
          }}>
            ✓ Verified
          </span>
        </div>
      </div>

      {/* Shared interests - small tags */}
      {sharedInterests.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#888' }}>In common:</span>
          {sharedInterests.map((interest, i) => (
            <span key={i} style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#F0F0F0', borderRadius: '12px', color: '#555' }}>
              {interest}
            </span>
          ))}
        </div>
      )}
      
      {/* Can Help With */}
      {helpsWith.length > 0 && (
        <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '13px', lineHeight: '1.5' }}>{helpsWith.join(', ')}</p>
        </div>
      )}

      {/* Languages + Availability - Stacked for better space */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1rem', fontSize: '12px', color: '#555' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{ fontSize: '14px', lineHeight: '1' }}>🗣️</span>
          <span style={{ flex: 1, lineHeight: '1.4' }}>
            {languages.length > 0 ? languages.join(', ') : 'English'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span style={{ fontSize: '14px', lineHeight: '1' }}>📅</span>
          <span style={{ flex: 1, lineHeight: '1.4' }}>
            {Array.isArray(availability) ? availability.join(', ') : (availability || 'Flexible availability')}
          </span>
        </div>
      </div>

      {/* View Profile Button - Small Teal Style */}
      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button
          onClick={onViewProfile}
          style={{
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: '#00897B',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#00695C'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#00897B'}
        >
          View Profile
        </button>
      </div>
    </Card>
  );
}
