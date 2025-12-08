import React from 'react';

const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah.j@email.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate about community service and helping others. Looking to make a meaningful impact through volunteering.',
  interests: ['Education', 'Environment', 'Health'],
  skills: ['Teaching', 'Event Planning', 'Communication'],
  availability: {
    monday: { morning: true, afternoon: false, evening: true },
    wednesday: { morning: false, afternoon: true, evening: false },
    friday: { morning: true, afternoon: true, evening: false }
  }
};

// Option A: Ultra-Minimal Card Design
const DesignA = () => {
  const days = Object.keys(mockUser.availability);
  const timeSlots = ['morning', 'afternoon', 'evening'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ 
        background: '#fff', 
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '40px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '300', 
            margin: '0 0 8px 0',
            color: '#1a1a1a'
          }}>
            {mockUser.name}
          </h1>
          <p style={{ 
            fontSize: '14px', 
            color: '#666',
            margin: 0
          }}>
            {mockUser.location}
          </p>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ 
            fontSize: '15px', 
            lineHeight: '1.6',
            color: '#333',
            margin: 0
          }}>
            {mockUser.bio}
          </p>
        </div>

        {/* Contact */}
        <div style={{ 
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
            {mockUser.email}
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {mockUser.phone}
          </div>
        </div>

        {/* Tags - Inline */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Interests & Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[...mockUser.interests, ...mockUser.skills].map((item, idx) => (
              <span key={idx} style={{
                fontSize: '13px',
                color: '#333',
                padding: '6px 14px',
                background: '#f8f8f8',
                borderRadius: '2px',
                border: '1px solid #e8e8e8'
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Availability - Grid */}
        <div>
          <div style={{ fontSize: '11px', color: '#999', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Availability
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {days.map(day => {
              const slots = mockUser.availability[day];
              const activeSlots = timeSlots.filter(slot => slots[slot]);
              return (
                <div key={day} style={{
                  padding: '16px',
                  background: '#fafafa',
                  border: '1px solid #e8e8e8',
                  borderRadius: '2px'
                }}>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '500',
                    marginBottom: '8px',
                    textTransform: 'capitalize',
                    color: '#1a1a1a'
                  }}>
                    {day}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {activeSlots.map(s => s.charAt(0).toUpperCase() + s.slice(1).substring(0, 3)).join(', ') || 'None'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Option B: Condensed Two-Column
const DesignB = () => {
  const days = Object.keys(mockUser.availability);
  const timeSlots = ['morning', 'afternoon', 'evening'];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ 
        background: '#fff', 
        border: '1px solid #e0e0e0',
        padding: '32px'
      }}>
        {/* Header Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '400', 
              margin: '0 0 6px 0',
              color: '#1a1a1a'
            }}>
              {mockUser.name}
            </h1>
            <p style={{ 
              fontSize: '15px', 
              lineHeight: '1.5',
              color: '#555',
              margin: '0'
            }}>
              {mockUser.bio}
            </p>
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.8' }}>
            <div>{mockUser.location}</div>
            <div>{mockUser.email}</div>
            <div>{mockUser.phone}</div>
          </div>
        </div>

        {/* Two Column Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr',
          gap: '40px'
        }}>
          {/* Left: Availability */}
          <div>
            <div style={{ 
              fontSize: '11px', 
              color: '#999', 
              marginBottom: '16px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px',
              fontWeight: '500'
            }}>
              Availability
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {days.map(day => {
                const slots = mockUser.availability[day];
                const activeSlots = timeSlots.filter(slot => slots[slot]);
                return (
                  <div key={day} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 16px',
                    background: '#fafafa',
                    fontSize: '13px'
                  }}>
                    <span style={{ fontWeight: '500', textTransform: 'capitalize', color: '#1a1a1a' }}>
                      {day}
                    </span>
                    <span style={{ color: '#666' }}>
                      {activeSlots.map(s => s.charAt(0).toUpperCase() + s.slice(1).substring(0, 3)).join(', ') || '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Tags */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '11px', 
                color: '#999', 
                marginBottom: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px',
                fontWeight: '500'
              }}>
                Interests
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {mockUser.interests.map((item, idx) => (
                  <div key={idx} style={{
                    fontSize: '13px',
                    color: '#333',
                    padding: '6px 0'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ 
                fontSize: '11px', 
                color: '#999', 
                marginBottom: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px',
                fontWeight: '500'
              }}>
                Skills
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {mockUser.skills.map((item, idx) => (
                  <div key={idx} style={{
                    fontSize: '13px',
                    color: '#333',
                    padding: '6px 0'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Option C: List-Based Minimal
const DesignC = () => {
  const days = Object.keys(mockUser.availability);
  const timeSlots = ['morning', 'afternoon', 'evening'];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ 
        background: '#fff', 
        border: '1px solid #e0e0e0',
        padding: '40px'
      }}>
        {/* Name */}
        <h1 style={{ 
          fontSize: '26px', 
          fontWeight: '300', 
          margin: '0 0 32px 0',
          color: '#1a1a1a',
          letterSpacing: '-0.5px'
        }}>
          {mockUser.name}
        </h1>

        {/* Sections as simple list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Contact */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              marginBottom: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Contact
            </div>
            <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.7' }}>
              <div>{mockUser.location}</div>
              <div>{mockUser.email}</div>
              <div>{mockUser.phone}</div>
            </div>
          </div>

          {/* About */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              marginBottom: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              About
            </div>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: '1.6',
              color: '#333',
              margin: 0
            }}>
              {mockUser.bio}
            </p>
          </div>

          {/* Interests */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              marginBottom: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Interests
            </div>
            <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.7' }}>
              {mockUser.interests.join(' · ')}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              marginBottom: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Skills
            </div>
            <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.7' }}>
              {mockUser.skills.join(' · ')}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div style={{ 
              fontSize: '10px', 
              color: '#999', 
              marginBottom: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontWeight: '600'
            }}>
              Availability
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {days.map(day => {
                const slots = mockUser.availability[day];
                const activeSlots = timeSlots.filter(slot => slots[slot]);
                return (
                  <div key={day} style={{
                    display: 'flex',
                    fontSize: '13px',
                    color: '#555'
                  }}>
                    <span style={{ 
                      width: '100px', 
                      textTransform: 'capitalize',
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      {day}
                    </span>
                    <span>
                      {activeSlots.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') || 'Not available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function ProfileDesignOptions2() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ 
        background: '#fff', 
        borderBottom: '1px solid #e0e0e0',
        padding: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '400', color: '#1a1a1a' }}>
            Profile Design Options — Professional & Minimal
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#666' }}>
            Choose your preferred aesthetic
          </p>
        </div>
      </div>

      {/* Design A */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#1a1a1a',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Option A — Ultra-Minimal Card
          </h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
            Single card layout with subtle borders, clean typography, and maximum whitespace
          </p>
        </div>
        <DesignA />
      </div>

      {/* Design B */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#1a1a1a',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Option B — Condensed Two-Column
          </h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
            Efficient two-column grid maximizing information density while staying clean
          </p>
        </div>
        <DesignB />
      </div>

      {/* Design C */}
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#1a1a1a',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Option C — List-Based Minimal
          </h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
            Vertical list format with clear section labels and simple text presentation
          </p>
        </div>
        <DesignC />
      </div>
    </div>
  );
}
