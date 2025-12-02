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