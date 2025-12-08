// TODO: Create VolunteerComparison component for MEDIUM TASK
//
// Props to implement:
// - volunteers: array of 2-3 volunteer objects
// - onSelect: callback when user chooses a volunteer
// - selectedId: currently selected volunteer ID
//
// Features:
// - Display 2-3 volunteers side-by-side
// - Use VolunteerCard component with compact prop
// - Highlight differences/similarities between volunteers
// - Responsive layout (stack on mobile, side-by-side on tablet+)
// - Clear "Select" or "Choose This Volunteer" button on each card
// - Equal spacing and sizing for fair comparison
//
// Layout:
// - Grid or flex layout with equal columns
// - Max 3 volunteers at once (design constraint)
// - Gap between cards for clarity
//
// Example usage:
// <VolunteerComparison 
//   volunteers={topMatches.slice(0, 3)}
//   onSelect={(id) => handleVolunteerSelect(id)}
//   selectedId={selectedVolunteerId}
// />

import React from "react";
import VolunteerCard from "./VolunteerCard";

export default function VolunteerComparison({
  volunteers = [],
  onSelect,
  selectedId,
}) {
  if (!volunteers || volunteers.length === 0) return null;

  // Enforce design constraint: max 3 volunteers
  const list = volunteers.slice(0, 3);

  return (
    <section
      aria-label="Compare volunteers"
      style={{ marginTop: "2rem" }}
    >
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          alignItems: "stretch",
        }}
      >
        {list.map((vol) => {
          const isSelected = vol.id === selectedId;

          return (
            <div
              key={vol.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                height: "100%",
              }}
            >
              {/* Compact VolunteerCard for side-by-side comparison */}
              <VolunteerCard
                volunteer={vol}
                compact={true}
                selected={isSelected}
                onClick={() => onSelect?.(vol.id)}
              />

              {/* Clear "Select" / "Selected" button */}
              <button
                type="button"
                onClick={() => onSelect?.(vol.id)}
                aria-pressed={isSelected}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                  backgroundColor: isSelected ? "#E3F2FD" : "#fff",
                  color: isSelected ? "#0d47a1" : "#333",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {isSelected ? "Selected" : "Choose This Volunteer"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}