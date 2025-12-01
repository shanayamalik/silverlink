import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

/**
 * VolunteerCard Component
 * Displays volunteer information with different visual styles.
 * 
 * TODO: DESIGN DECISION - Choose between these options:
 *   1. Use ONE consistent card design for all volunteers (pick helper, storyteller, or techie)
 *   2. Keep different designs per volunteer based on their "type" or strengths
 *   3. Create a NEW unified design that combines the best elements of all three
 * 
 * TODO: CARD vs EXTENDED PROFILE - Decide what info goes where:
 *   CURRENTLY ON CARD:
 *     - Name, Icon, Role, Verified badge
 *     - Bio (storyteller/techie only)
 *     - helpsWith / skills (varies by variant)
 *     - Availability (helper only)
 *     - Languages & tags (storyteller only)
 *   
 *   SHOULD CONSIDER FOR CARD:
 *     - Match percentage/score (from matching algorithm)
 *     - 1-2 shared interests with the senior
 *   
 *   SHOULD MOVE TO EXTENDED PROFILE:
 *     - Full bio/about me
 *     - Complete skills list
 *     - Rating & review count
 *     - Years volunteering
 *     - All languages spoken
 *     - Detailed availability calendar
 *     - Contact/scheduling options
 * 
 * @param {Object} props
 * @param {Object} props.volunteer - Volunteer data object
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.selected - Whether the card is selected
 * @param {string} props.variant - Card style: 'helper' | 'storyteller' | 'techie'
 */
export default function VolunteerCard({ volunteer, onClick, selected, variant = 'helper' }) {
  if (!volunteer) return null;

  const { 
    name, 
    icon,
    verified, 
    role,
    bio, 
    helpsWith = [],
    skills = [],
    languages = [],
    availability,
    tags = []
  } = volunteer;

  // Variant: Helper Style (Sarah Jenkins style - structured, verification focus)
  if (variant === 'helper') {
    return (
      <Card 
        variant="border" 
        hoverable 
        hoverEffect="glow"
        onClick={onClick}
        style={{ 
          border: selected ? '2px solid #1565C0' : undefined,
          backgroundColor: selected ? '#F5F9FF' : undefined,
          cursor: onClick ? 'pointer' : 'default'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '12px', 
            backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', flexShrink: 0
          }}>
            {icon || '🌿'}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
            <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
              {verified && (
                <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>
              )}
              {verified && role && <span>•</span>}
              {role && (
                <span style={{ backgroundColor: '#E0F2F1', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>
                  {role}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {helpsWith.length > 0 && (
          <div style={{ marginBottom: '1rem', padding: '12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
            <p style={{ margin: 0, fontWeight: '600' }}>{helpsWith.join(', ')}</p>
          </div>
        )}

        {availability && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#666', marginBottom: '1rem' }}>
            <span>📅 {availability}</span>
          </div>
        )}

        <Button size="medium" variant="primary" fullWidth onClick={onClick}>Request Help</Button>
      </Card>
    );
  }

  // Variant: Storyteller Style (Robert Chen style - quote/bio focus, tags)
  if (variant === 'storyteller') {
    return (
      <Card 
        variant="tint" 
        hoverable 
        hoverEffect="lift"
        onClick={onClick}
        style={{ 
          border: selected ? '2px solid #1565C0' : undefined,
          backgroundColor: selected ? '#F5F9FF' : undefined,
          cursor: onClick ? 'pointer' : 'default'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            backgroundColor: '#FFE0B2', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', border: '2px solid white', flexShrink: 0
          }}>
            {icon || '📚'}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{role}</p>
          </div>
        </div>
        
        {bio && (
          <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem', lineHeight: '1.4' }}>
            "{bio}"
          </p>
        )}

        {(languages.length > 0 || tags.length > 0) && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {languages.map((lang, i) => (
              <span key={i} style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                🗣️ {lang}
              </span>
            ))}
            {tags.map((tag, i) => (
              <span key={i} style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <Button size="medium" variant="primary" fullWidth onClick={onClick}>Chat with {name.split(' ')[0]}</Button>
      </Card>
    );
  }

  // Variant: Techie Style (Emily Davis style - skills list focus)
  if (variant === 'techie') {
    return (
      <Card 
        variant="shadow" 
        hoverable 
        hoverEffect="fill"
        onClick={onClick}
        style={{ 
          border: selected ? '2px solid #1565C0' : undefined,
          backgroundColor: selected ? '#F5F9FF' : undefined,
          cursor: onClick ? 'pointer' : 'default'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
            {role && (
              <span style={{ fontSize: '12px', padding: '2px 6px', backgroundColor: '#E3F2FD', color: '#1565C0', borderRadius: '4px', fontWeight: 'bold' }}>
                {role}
              </span>
            )}
          </div>
          <div style={{ fontSize: '24px' }}>{icon || '💻'}</div>
        </div>

        {bio && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{bio}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#888' }}>SKILLS</p>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '14px', color: '#444' }}>
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        <Button size="medium" variant="secondary" fullWidth onClick={onClick}>Request Help</Button>
      </Card>
    );
  }

  // Default fallback
  return null;
}
