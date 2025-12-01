import React, { useState } from 'react';
import Header from '../components/common/Header';
import VolunteerCard from '../components/VolunteerCard';
import { mockVolunteers } from '../data/mockVolunteers';

export default function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', paddingBottom: '2rem' }}>
      <Header title="Your Volunteer Matches" showBack showHome />
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
        
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

        {/* Volunteer Cards - Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {mockVolunteers.map(volunteer => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              variant={volunteer.variant}
              selected={selectedVolunteer === volunteer.id}
              onClick={() => setSelectedVolunteer(
                selectedVolunteer === volunteer.id ? null : volunteer.id
              )}
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
    </div>
  );
}
