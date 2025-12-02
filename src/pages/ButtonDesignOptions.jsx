import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';

// Sample volunteer for preview
const sampleVolunteer = {
  name: 'Maria Santos',
  icon: '👩‍🏫',
  role: 'Retired Librarian',
  verified: true,
  bio: 'Books brought me to this country, and now I want to share that love of reading with others.',
  helpsWith: ['Companionship', 'Reading Together', 'Library Help'],
  languages: ['Portuguese', 'English', 'Spanish'],
  availability: 'Tue, Thu Mornings',
};

// Button Option A: Solid Primary (current)
function ButtonOptionA({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#1565C0',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#0D47A1'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#1565C0'}
    >
      View Profile
    </button>
  );
}

// Button Option B: Outline Style
function ButtonOptionB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#1565C0',
        backgroundColor: 'transparent',
        border: '2px solid #1565C0',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#1565C0';
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#1565C0';
      }}
    >
      View Profile
    </button>
  );
}

// Button Option C: Soft/Muted Style
function ButtonOptionC({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#1565C0',
        backgroundColor: '#E3F2FD',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#BBDEFB'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#E3F2FD'}
    >
      View Profile
    </button>
  );
}

// Button Option D: Text Link Style
function ButtonOptionD({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#1565C0',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      onMouseOver={(e) => e.target.style.color = '#0D47A1'}
      onMouseOut={(e) => e.target.style.color = '#1565C0'}
    >
      View Profile →
    </button>
  );
}

// Button Option E: Pill Style with Icon
function ButtonOptionE({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#444',
        backgroundColor: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: '24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#EEEEEE';
        e.target.style.borderColor = '#BDBDBD';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#F5F5F5';
        e.target.style.borderColor = '#E0E0E0';
      }}
    >
      👤 View Profile
    </button>
  );
}

// Button Option F: Green/Teal Accent
function ButtonOptionF({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#00897B',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#00695C'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#00897B'}
    >
      View Profile
    </button>
  );
}

// Button Option G: Small Text Link (Minimalist)
function ButtonOptionG({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        style={{
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: '500',
          color: '#1565C0',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}
        onMouseOver={(e) => e.target.style.color = '#0D47A1'}
        onMouseOut={(e) => e.target.style.color = '#1565C0'}
      >
        View Profile
      </button>
    </div>
  );
}

// Button Option H: Small Outline (Minimalist)
function ButtonOptionH({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        style={{
          padding: '6px 16px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#666',
          backgroundColor: 'transparent',
          border: '1px solid #DDD',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseOver={(e) => {
          e.target.style.borderColor = '#1565C0';
          e.target.style.color = '#1565C0';
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = '#DDD';
          e.target.style.color = '#666';
        }}
      >
        View Profile
      </button>
    </div>
  );
}

// Button Option I: Small Pill (Minimalist)
function ButtonOptionI({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        style={{
          padding: '5px 14px',
          fontSize: '12px',
          fontWeight: '500',
          color: '#555',
          backgroundColor: '#F0F0F0',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#E0E0E0'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#F0F0F0'}
      >
        View Profile
      </button>
    </div>
  );
}

// Button Option J: Icon Only (Ultra Minimalist)
function ButtonOptionJ({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        style={{
          padding: '8px 12px',
          fontSize: '12px',
          fontWeight: '500',
          color: '#888',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'color 0.2s',
        }}
        onMouseOver={(e) => e.target.style.color = '#1565C0'}
        onMouseOut={(e) => e.target.style.color = '#888'}
      >
        View Profile →
      </button>
    </div>
  );
}

// Button Option K: Small Soft Blue (Minimalist)
function ButtonOptionK({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
        style={{
          padding: '6px 14px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#1565C0',
          backgroundColor: '#E3F2FD',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#BBDEFB'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#E3F2FD'}
      >
        View Profile
      </button>
    </div>
  );
}

// Button Option L: Small Teal (Option H sizing + Option F design)
function ButtonOptionL({ onClick }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={onClick}
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
  );
}

// Mini Card Preview Component
function CardPreview({ buttonComponent, label }) {
  const ButtonComponent = buttonComponent;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ 
        fontSize: '14px', 
        fontWeight: '700', 
        color: '#1565C0',
        textAlign: 'center',
        padding: '8px',
        backgroundColor: '#E3F2FD',
        borderRadius: '8px'
      }}>
        {label}
      </div>
      <Card variant="border" style={{ height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '12px', 
            backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', flexShrink: 0
          }}>
            {sampleVolunteer.icon}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{sampleVolunteer.name}</h3>
            <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>
              <span>•</span>
              <span style={{ backgroundColor: '#E0F2F1', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>
                {sampleVolunteer.role}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ 
          margin: '0 0 12px 0', fontSize: '13px', color: '#555', 
          fontStyle: 'italic', lineHeight: '1.4'
        }}>
          "{sampleVolunteer.bio}"
        </p>
        
        {/* Can Help With */}
        <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{sampleVolunteer.helpsWith.join(', ')}</p>
        </div>

        {/* Languages + Availability */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '12px', color: '#666', flexWrap: 'wrap', gap: '8px' }}>
          <span>🗣️ {sampleVolunteer.languages.join(', ')}</span>
          <span>📅 {sampleVolunteer.availability}</span>
        </div>

        {/* Button */}
        <ButtonComponent onClick={() => {}} />
      </Card>
    </div>
  );
}

export default function ButtonDesignOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'A', label: 'Option A: Solid Primary', component: ButtonOptionA },
    { id: 'B', label: 'Option B: Outline', component: ButtonOptionB },
    { id: 'C', label: 'Option C: Soft/Muted', component: ButtonOptionC },
    { id: 'D', label: 'Option D: Text Link', component: ButtonOptionD },
    { id: 'E', label: 'Option E: Pill with Icon', component: ButtonOptionE },
    { id: 'F', label: 'Option F: Teal Accent', component: ButtonOptionF },
    { id: 'G', label: 'Option G: Small Text Link', component: ButtonOptionG },
    { id: 'H', label: 'Option H: Small Outline', component: ButtonOptionH },
    { id: 'I', label: 'Option I: Small Pill', component: ButtonOptionI },
    { id: 'J', label: 'Option J: Arrow Link', component: ButtonOptionJ },
    { id: 'K', label: 'Option K: Small Soft Blue', component: ButtonOptionK },
    { id: 'L', label: 'Option L: Small Teal', component: ButtonOptionL },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Button Design Options" showBack showHome />
      
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
            🎨 <strong>Choose a button style:</strong> Review the options below and let me know which "View Profile" button design you prefer!
          </p>
        </div>

        {/* Options Grid - 3 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {options.map(option => (
            <CardPreview 
              key={option.id}
              label={option.label}
              buttonComponent={option.component}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
