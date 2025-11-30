import React from 'react';
import Card from './common/Card';

/**
 * VolunteerCard Component
 * Displays volunteer information in a "Soft Neutral" card style.
 * 
 * @param {Object} props
 * @param {Object} props.volunteer - Volunteer data object
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.selected - Whether the card is selected
 * @param {boolean} props.compact - Whether to show a compact version
 */
export default function VolunteerCard({ volunteer, onClick, selected, compact }) {
  if (!volunteer) return null;

  const { 
    name, 
    photo, 
    verified, 
    role = 'Community Volunteer', // Default role
    bio, 
    interests = [], 
    availability 
  } = volunteer;

  return (
    <Card 
      onClick={onClick}
      variant={selected ? 'border' : 'shadow'}
      className="volunteer-card"
      style={{ 
        border: selected ? '2px solid #1565C0' : '1px solid #eee',
        backgroundColor: selected ? '#F5F9FF' : 'white',
        padding: compact ? '1rem' : '1.5rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Header: Photo + Name + Verified */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        {/* Photo Placeholder */}
        <div style={{ 
          width: compact ? '50px' : '60px', 
          height: compact ? '50px' : '60px', 
          borderRadius: '50%', 
          backgroundColor: '#E0E0E0',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: compact ? '24px' : '30px',
          flexShrink: 0
        }}>
          {photo || '👤'}
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ margin: 0, fontSize: compact ? '18px' : '20px', color: '#333' }}>{name}</h3>
            {verified && (
              <span title="Verified Volunteer" style={{ fontSize: '16px' }}>✅</span>
            )}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>{role}</div>
        </div>
      </div>

      {/* Bio Section (Soft Neutral Style) */}
      {bio && !compact && (
        <div style={{ 
          marginBottom: '1rem', 
          backgroundColor: '#F5F7FA', 
          padding: '0.75rem 1rem', 
          borderRadius: '8px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '16px' }}>💬</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#546E7A' }}>About Me</span>
          </div>
          <div style={{ paddingLeft: '28px', color: '#000000', fontSize: '14px', fontStyle: 'italic' }}>
            "{bio}"
          </div>
        </div>
      )}

      {/* Details List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* Interests */}
        {interests.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '16px' }}>🤝</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Can Help With</span>
            </div>
            <div style={{ paddingLeft: '28px', color: '#555', fontSize: '14px' }}>
              {interests.join(', ')}
            </div>
          </div>
        )}

        {/* Availability */}
        {availability && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '16px' }}>📅</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Availability</span>
            </div>
            <div style={{ paddingLeft: '28px', color: '#555', fontSize: '14px' }}>
              {availability}
            </div>
          </div>
        )}
      </div>

      {/* Action Button (if not compact) */}
      {!compact && onClick && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span style={{ 
            color: '#1565C0', 
            fontWeight: '600', 
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            View Profile & Schedule
          </span>
        </div>
      )}
    </Card>
  );
}
