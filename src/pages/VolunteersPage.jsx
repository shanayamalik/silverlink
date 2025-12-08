import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import VolunteerCard from '../components/VolunteerCard';
import Button from '../components/common/Button';
import { mockVolunteers } from '../data/mockVolunteers';
import { matchVolunteers, matchVolunteersSoft } from '../utils/matching';

// Extended Profile Modal Component
function ExtendedProfileModal({ volunteer, onClose }) {
  const navigate = useNavigate();
  if (!volunteer) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', maxWidth: '500px',
        width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '12px',
            backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '36px', flexShrink: 0
          }}>
            {volunteer.icon || '👤'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '22px' }}>{volunteer.name}</h2>
            <span style={{ 
              fontSize: '0.65rem', 
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

        {/* About Me */}
        {volunteer.about && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>About Me</p>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#444' }}>{volunteer.about}</p>
          </div>
        )}

        {/* Can Help With */}
        {volunteer.helpsWith?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can Help With</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {volunteer.helpsWith.map((item, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 12px', backgroundColor: '#E8F5E9', borderRadius: '6px', color: '#2E7D32' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Interests */}
        {volunteer.skills?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills & Interests</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {volunteer.skills.map((skill, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 12px', backgroundColor: '#F5F5F5', borderRadius: '6px', color: '#555' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {volunteer.languages?.length > 0 && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Languages</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>🗣️ {volunteer.languages.join(', ')}</p>
          </div>
        )}

        {/* Availability */}
        {volunteer.availability && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Availability</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>📅 {volunteer.availability}</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151',
              backgroundColor: 'transparent',
              border: '1px solid #9ca3af',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.borderColor = '#6b7280'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = '#9ca3af'; }}
          >
            Close
          </button>
          <button
            onClick={() => navigate(`/chat/${volunteer.id}`, { state: { volunteer } })}
            style={{
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: '#0d9488',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0f766e'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0d9488'}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VolunteersPage() {
  const navigate = useNavigate();
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [profileVolunteer, setProfileVolunteer] = useState(null);
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [matchType, setMatchType] = useState('hard'); // 'hard' or 'soft'

  useEffect(() => {
    // Get user profile from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profile = user.profile || {};

    let matches = [];

    try {
      // Try hard matching first (requires help + availability overlap)
      matches = matchVolunteers(mockVolunteers, profile, {
        requireHelpMatch: true,
        requireAvailabilityMatch: true,
        maxResults: 3
      });

      console.log('🎯 Hard matches found:', matches.length, matches.map(m => m.name));

      // If no hard matches, fall back to soft matching
      if (matches.length === 0) {
        matches = matchVolunteersSoft(mockVolunteers, profile, {
          maxResults: 3
        });
        setMatchType('soft');
        console.log('🔄 Soft matches found:', matches.length, matches.map(m => m.name));
      } else {
        setMatchType('hard');
      }
    } catch (error) {
      console.error("Error during matching:", error);
      matches = [];
    }

    // If still no matches (shouldn't happen with soft), show top 3
    if (matches.length === 0) {
      matches = mockVolunteers.slice(0, 3);
      console.log('⚠️ No matches, showing first 3 volunteers');
    }

    setMatchedVolunteers(matches);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Your Volunteer Matches" showBack showHome />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* Match Banner */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: '#374151',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          Good news! We found <span style={{ color: '#0d9488', fontWeight: '600' }}>{matchedVolunteers.length}</span> volunteer{matchedVolunteers.length !== 1 ? 's' : ''} who match{matchedVolunteers.length === 1 ? 'es' : ''} your preferences.
        </div>

        {/* Volunteer Cards - Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {matchedVolunteers.map(volunteer => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              selected={selectedVolunteerId === volunteer.id}
              onViewProfile={() => setProfileVolunteer(volunteer)}
            />
          ))}
        </div>

        {/* Empty State (if no volunteers) */}
        {matchedVolunteers.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>
            <p style={{ fontSize: '48px', marginBottom: '1rem' }}>🔍</p>
            <p>No volunteers found. Complete your profile to see matches!</p>
          </div>
        )}

      </div>

      {/* Extended Profile Modal */}
      {profileVolunteer && (
        <ExtendedProfileModal 
          volunteer={profileVolunteer} 
          onClose={() => setProfileVolunteer(null)} 
        />
      )}
    </div>
  );
}
