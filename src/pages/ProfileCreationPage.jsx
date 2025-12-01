import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import { jsPDF } from "jspdf";

export default function ProfileCreationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default state
  // TODO: Improve the "About Me" section to have a more robust AI-generated bio (in first person??), or allow the user to regenerate it here if they are not satisfied.
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
  const [languages, setLanguages] = useState('');
  const [skills, setSkills] = useState('');

  // --- INTEREST SELECTION MODAL STATE ---
  const [showInterestModal, setShowInterestModal] = useState(false);

  const SUGGESTED_INTERESTS = [
    "Gardening", "Reading", "Walking", "Cooking", "Baking", 
    "Chess", "Music", "Art", "History", "Technology", 
    "Travel", "Pets", "Movies", "Knitting", "Sports"
  ];

  const CATEGORIZED_INTERESTS = {
    "Outdoors": ["Gardening", "Walking", "Nature", "Bird Watching"],
    "Indoors": ["Reading", "Cooking", "Baking", "Knitting"],
    "Social": ["Chess", "Board Games", "Conversation", "Tea/Coffee"],
    "Culture": ["Music", "Art", "History", "Movies"]
  };

  const CATEGORY_COLORS = {
    "Outdoors": "#4CAF50", // Green
    "Indoors": "#FF9800",  // Orange
    "Social": "#2196F3",   // Blue
    "Culture": "#9C27B0"   // Purple
  };

  // Load data from the Voice Interview analysis if available
  useEffect(() => {
    if (location.state?.analysisData) {
      const data = location.state.analysisData;
      // Use shortBio if available, otherwise fallback to summary
      if (data.shortBio) {
        setBio(data.shortBio);
      } else if (data.summary) {
        setBio(data.summary);
      }
      
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
      if (data.languages && Array.isArray(data.languages)) setLanguages(data.languages.join(', '));
      if (data.skills && Array.isArray(data.skills)) setSkills(data.skills.join(', '));
    }
  }, [location.state]);

  const handleDownloadTranscript = () => {
    const data = location.state?.analysisData;
    if (!data || (!data.summary && !data.summaryMarkdown)) {
      alert("No transcript summary available to download.");
      return;
    }

    const summaryContent = data.summary || data.summaryMarkdown;
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Volunteer Profile Summary", 20, 20);
    
    let yPos = 40;
    const pageWidth = 170; // mm
    
    // Split by lines to parse markdown headers
    const lines = summaryContent.split('\n');
    
    lines.forEach(line => {
      // Check for page break
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }

      if (line.startsWith('# ')) {
        // H1
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(line.replace('# ', ''), 20, yPos);
        yPos += 10;
      } else if (line.startsWith('## ')) {
        // H2
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(line.replace('## ', ''), 20, yPos);
        yPos += 8;
      } else if (line.startsWith('### ')) {
        // H3
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(line.replace('### ', ''), 20, yPos);
        yPos += 7;
      } else if (line.trim() === '') {
        // Empty line
        yPos += 4;
      } else {
        // Body text
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        
        // Clean up bold markers for PDF
        const cleanLine = line.replace(/\*\*/g, '').replace(/__/g, '');
        
        const splitLines = doc.splitTextToSize(cleanLine, pageWidth);
        doc.text(splitLines, 20, yPos);
        yPos += (splitLines.length * 5);
      }
    });
    
    doc.save('interview_summary.pdf');
  };

  const handleInterestRemove = (tagToRemove) => {
    setInterests(interests.filter(tag => tag !== tagToRemove));
  };

  const handleInterestAdd = () => {
    setShowInterestModal(true);
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const addCustomInterest = (interest) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const toggleAvailability = (key) => {
    setAvailabilityChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    // TODO: Add validation logic to ensure required fields (About Me, Interests) are not empty before saving. Disable the button if invalid.
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert("You must be logged in to save your profile.");
      return;
    }

    const profileData = {
      bio,
      interests,
      availability: {
        text: availabilityText,
        checks: availabilityChecks
      },
      languages,
      skills,
      completedAt: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, profileData })
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await response.json();
      
      // Update local storage with the updated user object from server
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
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

      {/* --- INTEREST SELECTION MODAL --- */}
      {showInterestModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem'
        }} onClick={() => setShowInterestModal(false)}>
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', padding: '24px',
            width: '100%', maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Add Interest</h3>
              <button onClick={() => setShowInterestModal(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(CATEGORIZED_INTERESTS).map(([category, items]) => (
                <div key={category}>
                  <h4 style={{ 
                    margin: '0 0 8px 0', fontSize: '13px', 
                    color: CATEGORY_COLORS[category] || '#888', 
                    textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.5px'
                  }}>
                    {category}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {items.map(interest => {
                      const isSelected = interests.includes(interest);
                      const activeColor = CATEGORY_COLORS[category] || '#333';
                      return (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          style={{
                            padding: '6px 12px', borderRadius: '6px', 
                            border: isSelected ? `1px solid ${activeColor}` : '1px solid #E0E0E0',
                            backgroundColor: isSelected ? activeColor : '#FAFAFA', 
                            color: isSelected ? 'white' : '#333', 
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.2s ease',
                            display: 'flex', alignItems: 'center', gap: '6px'
                          }}
                        >
                          {interest} {isSelected && <span>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Don't see yours?</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Type your own..." 
                  id="customInterestInput"
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.target.value;
                      if(val) {
                        addCustomInterest(val);
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    const input = document.getElementById('customInterestInput');
                    const val = input.value;
                    if(val) {
                      addCustomInterest(val);
                      input.value = '';
                    }
                  }}
                  style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Add
                </button>
              </div>
              
              <button 
                onClick={() => setShowInterestModal(false)}
                style={{ 
                  width: '100%', marginTop: '16px', padding: '12px', 
                  backgroundColor: '#4CAF50', color: 'white', 
                  border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' 
                }}
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'relative' }}>
          
          <h3 style={{ marginBottom: '2rem', fontSize: '18px', color: '#444', textAlign: 'center' }}>
            Review & Confirm
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Bio Section - Soft Blue */}
            <div>
              {/* TODO: Consider adding other required or optional sections to the profile (e.g. Location, Availability Preferences) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#5C9CE6', fontWeight: '700', margin: 0 }}>
                  <UserIcon /> About Me <span style={{ color: '#D32F2F', marginLeft: '2px', fontSize: '18px', fontWeight: '900', lineHeight: '1' }}>*</span>
                </label>
                
                {/* Bio Header Placement (Pill Style) */}
                <button 
                  onClick={handleDownloadTranscript}
                  style={{ 
                    padding: '6px 12px', backgroundColor: '#f0f7ff', color: '#0066cc', 
                    border: 'none', borderRadius: '20px', fontWeight: '600', fontSize: '11px', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Interview Notes
                </button>
              </div>

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
                <HeartIcon /> Interests <span style={{ color: '#D32F2F', marginLeft: '2px', fontSize: '18px', fontWeight: '900', lineHeight: '1' }}>*</span>
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
                <CalendarIcon /> Availability <span style={{ color: '#D32F2F', marginLeft: '2px', fontSize: '18px', fontWeight: '900', lineHeight: '1' }}>*</span>
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

            {/* Languages Section - Soft Orange */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFB74D', marginBottom: '12px', fontWeight: '700' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                Languages
              </label>
              <input 
                type="text" 
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="e.g. English, Spanish, Mandarin"
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '8px', 
                  border: '1px solid #FFF3E0', backgroundColor: '#FAFAFA', 
                  fontSize: '14px', outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFB74D'}
                onBlur={(e) => e.target.style.borderColor = '#FFF3E0'}
              />
            </div>

            {/* Skills Section - Soft Pink */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#F06292', marginBottom: '12px', fontWeight: '700' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Skills & Talents
              </label>
              <textarea 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Share a special skill! (e.g., Secret Recipes, Knitting, Storytelling, Chess)"
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '8px', 
                  border: '1px solid #FCE4EC', backgroundColor: '#FAFAFA', 
                  fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
                  minHeight: '80px', fontFamily: 'inherit', resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F06292'}
                onBlur={(e) => e.target.style.borderColor = '#FCE4EC'}
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
