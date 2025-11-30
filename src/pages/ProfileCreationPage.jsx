import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';

export default function ProfileCreationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default state
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [availabilityText, setAvailabilityText] = useState('');
  const [availabilityChecks, setAvailabilityChecks] = useState({
    Weekends: false,
    Weekdays: false,
    Mornings: false,
    Afternoons: false,
    Evenings: false
  });

  // Load data from the Voice Interview analysis if available
  useEffect(() => {
    if (location.state?.analysisData) {
      const data = location.state.analysisData;
      if (data.summary) setBio(data.summary);
      if (data.interests && Array.isArray(data.interests)) setInterests(data.interests);
      if (data.availability) {
        setAvailabilityText(data.availability);
        // Simple heuristic to check boxes based on the text
        const text = data.availability.toLowerCase();
        setAvailabilityChecks(prev => ({
          Weekends: text.includes('weekend'),
          Weekdays: text.includes('weekday'),
          Mornings: text.includes('morning'),
          Afternoons: text.includes('afternoon'),
          Evenings: text.includes('evening')
        }));
      }
    }
  }, [location.state]);

  const handleInterestRemove = (tagToRemove) => {
    setInterests(interests.filter(tag => tag !== tagToRemove));
  };

  const handleInterestAdd = () => {
    const newInterest = prompt("Enter a new interest:");
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
    }
  };

  const toggleAvailability = (key) => {
    setAvailabilityChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // In a real app, this would send data to the backend
    const profileData = {
      bio,
      interests,
      availability: {
        text: availabilityText,
        checks: availabilityChecks
      },
      completedAt: new Date().toISOString()
    };
    
    console.log("Saving Profile:", profileData);
    
    // Save to local storage for demo purposes
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...user, ...profileData, hasProfile: true }));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  // Icons
  const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  );
  const HeartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  );
  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '4rem' }}>
      <Header title="Create Your Profile" showBack />
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '18px', color: '#444', textAlign: 'center' }}>
            Review & Confirm
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Bio Section - Soft Blue */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#5C9CE6', marginBottom: '12px', fontWeight: '700' }}>
                <UserIcon /> About Me <span style={{ color: 'var(--color-error)', marginLeft: '4px' }}>*</span>
              </label>
              {/* TODO: Add validation logic to ensure this field is not empty before saving */}
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '8px', 
                  border: '1px solid #E3F2FD', minHeight: '100px', 
                  fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.6',
                  backgroundColor: '#FAFAFA', resize: 'vertical', outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#5C9CE6'}
                onBlur={(e) => e.target.style.borderColor = '#E3F2FD'}
              />
            </div>

            {/* Interests Section - Soft Purple */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#BA68C8', marginBottom: '12px', fontWeight: '700' }}>
                <HeartIcon /> Interests <span style={{ color: 'var(--color-error)', marginLeft: '4px' }}>*</span>
              </label>
              {/* TODO: Add validation logic to ensure at least 1 interest is selected */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map(tag => (
                  <span key={tag} style={{ 
                    backgroundColor: 'white', color: '#BA68C8', border: '1px solid #F3E5F5',
                    padding: '6px 12px', borderRadius: '20px', 
                    fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    {tag}
                    <button 
                      onClick={() => handleInterestRemove(tag)}
                      style={{ border: 'none', background: 'none', color: '#BA68C8', cursor: 'pointer', fontSize: '14px', padding: 0, display: 'flex', opacity: 0.6 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button 
                  onClick={handleInterestAdd}
                  style={{ 
                    padding: '6px 12px', borderRadius: '20px', border: '1px dashed #E1BEE7', 
                    backgroundColor: 'transparent', color: '#BA68C8', cursor: 'pointer', fontSize: '13px'
                  }}
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Availability Section - Soft Teal */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#4DB6AC', marginBottom: '12px', fontWeight: '700' }}>
                <CalendarIcon /> Availability <span style={{ color: 'var(--color-error)', marginLeft: '4px' }}>*</span>
              </label>
              {/* TODO: Add validation logic to ensure at least 1 availability option is checked */}
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
                {Object.keys(availabilityChecks).map(opt => (
                  <label key={opt} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    cursor: 'pointer', padding: '4px 0'
                  }}>
                    <input 
                      type="checkbox" 
                      checked={availabilityChecks[opt]} 
                      onChange={() => toggleAvailability(opt)}
                      style={{ accentColor: '#4DB6AC' }} 
                    />
                    <span style={{ fontSize: '14px', color: '#555' }}>{opt}</span>
                  </label>
                ))}
              </div>
              
              <input 
                type="text" 
                value={availabilityText}
                onChange={(e) => setAvailabilityText(e.target.value)}
                placeholder="Specific details..."
                style={{ width: '100%', padding: '8px 0', border: 'none', borderBottom: '1px solid #E0F2F1', fontSize: '14px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderBottomColor = '#4DB6AC'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E0F2F1'}
              />
            </div>
            
            <button 
              onClick={handleSave}
              style={{ 
                width: '100%', padding: '14px', backgroundColor: '#333', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', 
                marginTop: '1rem', cursor: 'pointer'
              }}
            >
              Confirm Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
