import React from 'react';
import Card from './common/Card';

/**
 * VolunteerCard Component
 * Displays volunteer information in the "Compact Row" style.
 * 
 * Shows: Name, icon, role, verified badge, short bio, 
 *        "Can help with", languages, and availability.
 * 
 * Extended profile (modal) shows: Full about me, skills list,
 *        detailed availability, years volunteering.
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
    verified, 
    role,
    bio, 
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
      {/* Header: Icon + Name + Role */}
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
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
            {verified && <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>}
            {verified && role && <span>•</span>}
            {role && (
              <span style={{ backgroundColor: '#E0F2F1', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>
                {role}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <p style={{ 
          margin: '0 0 12px 0', fontSize: '13px', color: '#555', 
          fontStyle: 'italic', lineHeight: '1.4'
        }}>
          "{bio}"
        </p>
      )}
      
      {/* Can Help With */}
      {helpsWith.length > 0 && (
        <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{helpsWith.join(', ')}</p>
        </div>
      )}

      {/* Languages + Availability row - fixed positions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '12px', color: '#666', gap: '8px' }}>
        <span style={{ minWidth: '40%' }}>
          {languages.length > 0 ? `🗣️ ${languages.join(', ')}` : '\u00A0'}
        </span>
        <span>
          {availability ? `📅 ${availability}` : '\u00A0'}
        </span>
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
