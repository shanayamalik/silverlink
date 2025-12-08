import React from 'react';
import Card from './common/Card';

// export default function VolunteerCard() {
//   return null;
// }
// src/components/VolunteerCard.jsx

// If this path is different in your project, adjust it:
// e.g. "../../public/verified-badge.svg" or "/verified-badge.svg"
// src/components/VolunteerCard.jsx
// ================================
// VolunteerCard Component (MEDIUM TASK)
// ================================
//
// Props:
// - volunteer: object containing volunteer data:
//   {
//     id, name, photo, interests[], communicationStyle,
//     location, age, verified, bio, matchScore, role, profession
//   }
// - onClick: click handler for viewing details
// - selected: boolean — highlights the card when chosen for comparison
// - compact: boolean — renders a smaller version (used in side-by-side view)
//
// Features:
// - Display volunteer photo or placeholder initial
// - Show verified badge (verified-badge.svg) when volunteer.verified is true
// - Display 2–3 top interests as chips
// - Show communication style, age, and role/profession
// - Optional match score percentage
// - Large click/tap target for accessibility
//
// Accessibility:
// - ARIA labels for screen readers
// - Keyboard support (Enter/Space)
// - Alt text for images
//
// Example usage:
// <VolunteerCard
//   volunteer={volunteerData}
//   onClick={() => viewDetails(volunteer.id)}
//   selected={false}
//   compact={false}
// />
//

import React from "react";

// Serving from public/icons (no import needed because Vite handles public folder)
const VERIFIED_BADGE_SRC = "/icons/verified-badge.svg";

export default function VolunteerCard({
  volunteer,
  onClick,
  selected = false,
  compact = false,
}) {
  if (!volunteer) return null;

  const {
    id,
    name,
    photo,
    interests = [],
    communicationStyle,
    location,
    age,
    verified,
    bio,
    matchScore,
    role,
    profession,
  } = volunteer;

  const roleTag = role || profession || location || "Community volunteer";

  // Take the first 2–3 interests
  const topInterests = interests.slice(0, 3);

  // Convert match score (handles 0–1 or 0–100 inputs)
  let matchPercent = null;
  if (typeof matchScore === "number") {
    matchPercent = matchScore <= 1 ? Math.round(matchScore * 100) : Math.round(matchScore);
  }

  const firstName = name?.split(" ")[0] || name || "this volunteer";
  const wantsChat =
    typeof communicationStyle === "string" &&
    communicationStyle.toLowerCase().includes("chat");

  const buttonText = wantsChat
    ? `Chat with ${firstName}`
    : `Request Help from ${firstName}`;

  const cardClasses = [
    "volunteer-card",
    selected && "volunteer-card--selected",
    compact && "volunteer-card--compact",
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={cardClasses}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-pressed={selected}
      aria-label={`${name}, ${roleTag}${
        matchPercent != null ? `, ${matchPercent}% match` : ""
      }`}
      style={{
        border: "1px solid #ddd",
        borderRadius: "16px",
        padding: compact ? "12px" : "16px",
        display: "flex",
        gap: "12px",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: selected ? "0 0 0 3px #1976d2" : "none",
      }}
    >
      {/* Left: Photo */}
      <div
        style={{
          width: compact ? 48 : 64,
          height: compact ? 48 : 64,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: compact ? 20 : 26,
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={`Photo of ${name}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span aria-hidden="true">{firstName.charAt(0) || "V"}</span>
        )}
      </div>

      {/* Right side content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name + Verified Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: compact ? 16 : 18,
              fontWeight: 600,
            }}
          >
            {name}
          </h3>

          {verified && (
            <img
              src={VERIFIED_BADGE_SRC}
              alt="Verified volunteer"
              style={{ width: 20, height: 20 }}
            />
          )}
        </div>

        {/* Tags: Role, Age, Communication style, Match score */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            fontSize: 12,
            color: "#555",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 999,
              backgroundColor: "#E3F2FD",
              color: "#1565C0",
              fontWeight: 600,
            }}
          >
            {roleTag}
          </span>

          {age && <span>{age} yrs</span>}

          {communicationStyle && (
            <span style={{ fontStyle: "italic" }}>{communicationStyle}</span>
          )}

          {matchPercent != null && (
            <span style={{ fontWeight: 600 }}>{matchPercent}% match</span>
          )}
        </div>

        {/* Bio — only in non-compact mode */}
        {!compact && bio && (
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: 13,
              color: "#444",
            }}
          >
            {bio}
          </p>
        )}

        {/* Interests */}
        {topInterests.length > 0 && (
          <div style={{ marginBottom: 8, fontSize: 12 }}>
            <span style={{ color: "#888", marginRight: 4 }}>Can help with:</span>
            {topInterests.map((interest) => (
              <span
                key={interest}
                style={{
                  display: "inline-block",
                  marginRight: 6,
                  marginTop: 4,
                  padding: "2px 8px",
                  borderRadius: 999,
                  backgroundColor: "#F5F5F5",
                  fontSize: 12,
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: 999,
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
}
/**
 * VolunteerCard Component
 * Displays volunteer information in the "Compact Row" style.
 * 
 * Shows: Name, icon, verified badge, shared interests,
 *        "Can help with", languages, and availability.
 * 
 * Extended profile (modal) shows: Full about me, skills list,
 *        detailed availability, age range.
 * 
 * @param {Object} props
 * @param {Object} props.volunteer - Volunteer data object
 * @param {function} props.onViewProfile - Handler for "View Profile" button
 * @param {boolean} props.selected - Whether the card is selected
 */
export default function VolunteerCard({ volunteer, onViewProfile, selected }) {
  if (!volunteer) return null;

  const { 
    name, 
    icon,
    sharedInterests = [],
    helpsWith = [],
    languages = [],
    availability
  } = volunteer;

  return (
    <Card 
      variant="border" 
      hoverable 
      hoverEffect="glow"
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: selected ? '2px solid #1565C0' : undefined,
        backgroundColor: selected ? '#F5F9FF' : undefined
      }}
    >
      {/* Header: Icon + Name + Status/Experience */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '12px', 
          backgroundColor: '#E0F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px', flexShrink: 0
        }}>
          {icon || '👤'}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{name}</h3>
          <span style={{ 
            fontSize: '0.6rem', 
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

      {/* Shared interests - small tags */}
      {sharedInterests.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#888' }}>In common:</span>
          {sharedInterests.map((interest, i) => (
            <span key={i} style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#F0F0F0', borderRadius: '12px', color: '#555' }}>
              {interest}
            </span>
          ))}
        </div>
      )}
      
      {/* Can Help With */}
      {helpsWith.length > 0 && (
        <div style={{ marginBottom: '12px', padding: '10px 12px', backgroundColor: '#F9F9F9', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Can help with</p>
          <p style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>{helpsWith.join(', ')}</p>
        </div>
      )}

      {/* Languages + Availability row - fixed positions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '12px', color: '#666', gap: '8px' }}>
        <span style={{ minWidth: '40%' }}>
          {languages.length > 0 ? `🗣️ ${languages.join(', ')}` : '\u00A0'}
        </span>
        <span>
          {availability ? `📅 ${availability}` : '\u00A0'}
        </span>
      </div>

      {/* View Profile Button - Small Teal Style */}
      <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        <button
          onClick={onViewProfile}
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
    </Card>
  );
}
