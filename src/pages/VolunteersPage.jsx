import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import VolunteerCard from '../components/VolunteerCard';
import Button from '../components/common/Button';
import { mockVolunteers } from '../data/mockVolunteers';
import { matchVolunteers, matchVolunteersSoft } from '../utils/matching';

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

        {/* TODO: Decide whether to include Age Range */}

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

// TODO: VolunteersPage - MEDIUM TASK
//
// This page implements the Medium Task where seniors:
// 1. Browse personalized volunteer recommendations
// 2. Compare 2-3 volunteers side-by-side
// 3. Select a volunteer
// 4. Schedule a chat time
//
// Components to use:
// - Header
// - VolunteerComparison (shows 2-3 volunteers)
// - SchedulingCalendar (after volunteer selection)
// - Button
//
// Flow:
// 1. Load preferences from localStorage or API
// 2. Filter mock volunteers based on preferences (matching algorithm)
// 3. Display top 2-3 matches using VolunteerComparison
// 4. User selects a volunteer
// 5. Show SchedulingCalendar
// 6. User picks date/time
// 7. Save to backend: POST /api/chats
// 8. Navigate to DashboardPage with confirmation
//
// State management:
// - volunteers: filtered volunteer list
// - selectedVolunteer: chosen volunteer object
// - showScheduling: boolean (toggle between comparison and scheduling)
//
// Data source:
// - Import from mockVolunteers.js
// - Filter based on user preferences
//
// Example structure:
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/common/Header';
// import VolunteerComparison from '../components/VolunteerComparison';
// import SchedulingCalendar from '../components/SchedulingCalendar';
// import { mockVolunteers } from '../data/mockVolunteers';
//
// export default function VolunteersPage() {
//   const [volunteers, setVolunteers] = useState([]);
//   const [selectedVolunteer, setSelectedVolunteer] = useState(null);
//   const [showScheduling, setShowScheduling] = useState(false);
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     // Load preferences and filter volunteers
//     const prefs = JSON.parse(localStorage.getItem('preferences'));
//     const filtered = mockVolunteers.filter(/* matching logic */);
//     setVolunteers(filtered.slice(0, 3)); // Top 3 matches
//   }, []);
//
//   const handleVolunteerSelect = (id) => {
//     const volunteer = volunteers.find(v => v.id === id);
//     setSelectedVolunteer(volunteer);
//     setShowScheduling(true);
//   };
//
//   const handleSchedule = async (slot) => {
//     // Save to backend or localStorage
//     navigate('/dashboard');
//   };
//
//   return (
//     <div className="volunteers-page">
//       <Header title="Your Volunteer Matches" showBack showHome />
//       {!showScheduling ? (
//         <VolunteerComparison 
//           volunteers={volunteers}
//           onSelect={handleVolunteerSelect}
//         />
//       ) : (
//         <SchedulingCalendar 
//           volunteerId={selectedVolunteer.id}
//           volunteerName={selectedVolunteer.name}
//           onSchedule={handleSchedule}
//         />
//       )}
//     </div>
//   );
// }

// src/pages/VolunteersPage.jsx

// VolunteersPage - MEDIUM TASK
//
// This page implements the Medium Task where seniors:
// 1. Browse personalized volunteer recommendations
// 2. Compare 2-3 volunteers side-by-side
// 3. Select a volunteer
// 4. Schedule a chat time

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import VolunteerComparison from "../components/VolunteerComparison";
import SchedulingCalendar from "../components/SchedulingCalendar";
import { mockVolunteers } from "../data/mockVolunteers";

export default function VolunteersPage() {
  // Filtered top matches
  const [volunteers, setVolunteers] = useState([]);
  // Currently selected volunteer id
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  // Whether we are in scheduling step
  const [showScheduling, setShowScheduling] = useState(false);

  const navigate = useNavigate();
  function computeMatchScore(volunteer, prefs) {
    let score = 0;
    const MAX_SCORE = 5;

    // 1) interests / helpType
    if (prefs?.helpType && Array.isArray(volunteer.interests)) {
      const keyword = String(prefs.helpType).toLowerCase();
      const interestMatch = volunteer.interests.some((i) =>
        String(i).toLowerCase().includes(keyword)
      );
      if (interestMatch) {
        score += 3; // interests 
      }
    }

    // 2) communicationStyle if patient
    if (
      prefs?.needsPatience &&
      typeof volunteer.communicationStyle === "string" &&
      volunteer.communicationStyle.toLowerCase().includes("patient")
    ) {
      score += 1;
    }

    // 3) verified：give a little score
    if (volunteer.verified) {
      score += 1;
    }

    if (score === 0) {
      return 0.2; // give a default
    }

    return Math.min(score / MAX_SCORE, 1);
  }
  useEffect(() => {
    const prefsRaw = localStorage.getItem("preferences");
    // have a copy
    let ranked = mockVolunteers.map((v) => ({ ...v }));

    if (prefsRaw) {
      try {
        const prefs = JSON.parse(prefsRaw);

        // give every volunteer a match score
        ranked = ranked.map((v) => {
          const dynamicScore = computeMatchScore(v, prefs);
          return {
            ...v,
            matchScore: dynamicScore,
          };
        });

        // ran highest to lowest rank
        ranked.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      } catch (e) {
        console.warn("Failed to parse preferences; using base ordering.", e);
        // 
      }
    }

    // get top 3
    setVolunteers(ranked.slice(0, 3));
  }, []);

  const handleVolunteerSelect = (id) => {
    setSelectedVolunteerId(id);
    setShowScheduling(true);
  };

  const handleSchedule = async (slot) => {
    const volunteer = volunteers.find((v) => v.id === selectedVolunteerId);
    if (!volunteer) return;
  
    // 1) Create a chat object to store both locally and on the backend
    const chat = {
      volunteerId: volunteer.id,
      volunteerName: volunteer.name,
      slot,                         // { date, time, duration, ... }
      createdAt: new Date().toISOString(),
    };
  
    // 2) Save the chat to localStorage (append to an existing array)
    try {
      const existingRaw = localStorage.getItem("scheduledChats");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(chat);
      localStorage.setItem("scheduledChats", JSON.stringify(existing));
    } catch (e) {
      console.warn("Failed to save chat to localStorage:", e);
    }
  
    // 3) Send the chat to the backend
    try {
      await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chat),
      });
    } catch (err) {
      console.error("Failed to save chat request to backend:", err);
    }
  
    // 4) Navigate to the dashboard after booking
    navigate("/dashboard");
  };

  const selectedVolunteer =
    volunteers.find((v) => v.id === selectedVolunteerId) || null;

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <Header title="Your Volunteer Matches" showBack showHome />

      {!showScheduling && (
        <>
          <p
            style={{
              textAlign: "center",
              margin: "1rem 0 2rem",
              color: "#666",
            }}
          >
            These are your top volunteer matches based on your preferences.
          </p>

          <VolunteerComparison
            volunteers={volunteers}
            onSelect={handleVolunteerSelect}
            selectedId={selectedVolunteerId}
          />
        </>
      )}

      {showScheduling && selectedVolunteer && (
        <div style={{ maxWidth: "480px", margin: "2rem auto 0" }}>
          <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            Schedule a chat with {selectedVolunteer.name}
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#666",
            }}
          >
            Choose a time that works for you. We’ll send this request to your
            volunteer.
          </p>

          <SchedulingCalendar
            volunteerId={selectedVolunteer.id}
            volunteerName={selectedVolunteer.name}
            onSchedule={handleSchedule}
            // optional: go back to comparison if they change their mind
            onBack={() => setShowScheduling(false)}
          />
        </div>
      )}
    </div>
  );


}
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [profileVolunteer, setProfileVolunteer] = useState(null);
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [matchType, setMatchType] = useState('hard'); // 'hard' or 'soft'

  useEffect(() => {
    // Get user profile from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profile = user.profile || {};

    // Try hard matching first (requires help + availability overlap)
    let matches = matchVolunteers(mockVolunteers, profile, {
      requireHelpMatch: true,
      requireAvailabilityMatch: true,
      maxResults: 3
    });

    // If no hard matches, fall back to soft matching
    if (matches.length === 0) {
      matches = matchVolunteersSoft(mockVolunteers, profile, {
        maxResults: 3
      });
      setMatchType('soft');
    } else {
      setMatchType('hard');
    }

    // If still no matches (shouldn't happen with soft), show top 3
    if (matches.length === 0) {
      matches = mockVolunteers.slice(0, 3);
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
