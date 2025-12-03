import React from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';

// Sample volunteer
const volunteer = {
  name: 'Maria Santos',
  icon: '👩‍🏫',
  isActive: true,
  yearsVolunteering: 4,
  bio: 'Books brought me to this country, and now I want to share that love of reading with others.',
  helpsWith: ['Companionship', 'Reading Together', 'Library Help'],
  languages: ['Portuguese', 'English'],
  availability: 'Tue, Thu Mornings',
  sharedInterests: ['Reading', 'Gardening'],
  tagline: 'Patient listener, loves tea',
  recentActivity: 'Helped 3 people this month',
};

// Card Layout Option A: Current (with quote)
function CardOptionA({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      {/* Quote/Bio */}
      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#555', fontStyle: 'italic', lineHeight: '1.4' }}>
        "{vol.bio}"
      </p>
      
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option B: No quote (cleaner)
function CardOptionB({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      {/* No quote - straight to help */}
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option C: Shared interests - subtle inline
function CardOptionC({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      {/* Shared interests - subtle text */}
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#666' }}>
        <span style={{ color: '#2E7D32' }}>✓</span> You both enjoy <strong>{vol.sharedInterests.join(' & ')}</strong>
      </p>
      
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option C2: Shared interests - small tags
function CardOptionC2({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      {/* Shared interests - small tags */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: '#888' }}>In common:</span>
        {vol.sharedInterests.map((interest, i) => (
          <span key={i} style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#F0F0F0', borderRadius: '12px', color: '#555' }}>
            {interest}
          </span>
        ))}
      </div>
      
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option C3: Shared interests - icon based
function CardOptionC3({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
          {/* Shared interests under status */}
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#888' }}>
            💚 {vol.sharedInterests.length} shared interests
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option D: Short tagline instead of quote
function CardOptionD({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
          {/* Tagline under name */}
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888' }}>{vol.tagline}</p>
        </div>
      </div>

      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option D2: Tagline + shared interests combo
function CardOptionD2({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
          {/* Tagline */}
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888' }}>{vol.tagline}</p>
        </div>
      </div>

      {/* Shared interests - minimal */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: '#888' }}>In common:</span>
        {vol.sharedInterests.map((interest, i) => (
          <span key={i} style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#F0F0F0', borderRadius: '12px', color: '#555' }}>
            {interest}
          </span>
        ))}
      </div>

      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option D3: Clean with shared interests inline
function CardOptionD3({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      {/* Shared interests row - same style as languages/availability */}
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
        💚 Also likes: {vol.sharedInterests.join(', ')}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

// Card Layout Option E: Recent activity
function CardOptionE({ vol }) {
  return (
    <Card variant="border" style={{ height: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
          {vol.icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{vol.name}</h3>
          <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center' }}>
            <span style={{ color: '#2E7D32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></span>
              Active
            </span>
            <span>•</span>
            <span style={{ color: '#F5A623' }}>★ {vol.yearsVolunteering}y experience</span>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#1565C0', backgroundColor: '#E3F2FD', padding: '6px 10px', borderRadius: '6px', display: 'inline-block' }}>
        ✓ {vol.recentActivity}
      </p>
      
      <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{vol.helpsWith.join(', ')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        <span>🗣️ {vol.languages.join(', ')}</span>
        <span>📅 {vol.availability}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ padding: '6px 16px', fontSize: '12px', fontWeight: '600', color: 'white', backgroundColor: '#00897B', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          View Profile
        </button>
      </div>
    </Card>
  );
}

export default function CardLayoutOptions() {
  const options = [
    { id: 'B', label: 'Clean (no quote)', component: CardOptionB },
    { id: 'C', label: 'Shared interests (text)', component: CardOptionC },
    { id: 'C2', label: 'Shared interests (tags)', component: CardOptionC2 },
    { id: 'C3', label: 'Shared interests (count)', component: CardOptionC3 },
    { id: 'D', label: 'Tagline under name', component: CardOptionD },
    { id: 'D2', label: 'Tagline + interests', component: CardOptionD2 },
    { id: 'D3', label: 'Clean + interests row', component: CardOptionD3 },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Card Layout Options" showBack showHome />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        
        <div style={{ 
          backgroundColor: '#FFF3E0', 
          padding: '1rem 1.5rem', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          border: '1px solid #FFE0B2'
        }}>
          <p style={{ margin: 0, color: '#E65100', fontSize: '14px' }}>
            🎨 <strong>Choose a card layout:</strong> What should replace the quote/bio section?
            <br />Note: All options now use the gold star with "experience" label.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {options.map(option => (
            <div key={option.id}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '700', 
                color: '#1565C0',
                padding: '8px 12px',
                backgroundColor: '#E3F2FD',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}>
                Option {option.id}: {option.label}
              </div>
              <option.component vol={volunteer} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
