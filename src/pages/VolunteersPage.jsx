import React, { useState } from 'react';
import Header from '../components/common/Header';
import VolunteerCard from '../components/VolunteerCard';
import Button from '../components/common/Button';
import { mockVolunteers } from '../data/mockVolunteers';

// Extended Profile Modal Component
function ExtendedProfileModal({ volunteer, onClose }) {
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
            <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', alignItems: 'center', flexWrap: 'wrap' }}>
              {volunteer.verified && <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>✓ Verified</span>}
              {volunteer.verified && volunteer.role && <span>•</span>}
              {volunteer.role && (
                <span style={{ backgroundColor: '#E0F2F1', padding: '2px 8px', borderRadius: '4px', color: '#004D40', fontWeight: '600' }}>
                  {volunteer.role}
                </span>
              )}
            </div>
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

        {/* Availability + Experience row */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {volunteer.availability && (
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Availability</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>📅 {volunteer.availability}</p>
            </div>
          )}
          {volunteer.yearsVolunteering && (
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#222', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#444' }}>⭐ {volunteer.yearsVolunteering} years volunteering</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary" fullWidth onClick={onClose}>
            Close
          </Button>
          <button
            style={{
              flex: 1,
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
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VolunteersPage() {
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [profileVolunteer, setProfileVolunteer] = useState(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Your Volunteer Matches" showBack showHome />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* Intro Text */}
        <div style={{ 
          backgroundColor: '#E3F2FD', 
          padding: '1rem 1.5rem', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          border: '1px solid #BBDEFB'
        }}>
          <p style={{ margin: 0, color: '#1565C0', fontSize: '14px' }}>
            🎉 <strong>Great news!</strong> Based on your profile, we found {mockVolunteers.length} volunteers who match your interests and availability.
          </p>
        </div>

        {/* Volunteer Cards - Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {mockVolunteers.map(volunteer => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              selected={selectedVolunteerId === volunteer.id}
              onViewProfile={() => setProfileVolunteer(volunteer)}
            />
          ))}
        </div>

        {/* Empty State (if no volunteers) */}
        {mockVolunteers.length === 0 && (
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
