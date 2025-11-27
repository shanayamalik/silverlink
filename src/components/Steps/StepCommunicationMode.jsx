import React from "react";
import "../../styles/StepCommunicationMode.css";

export const COMMUNICATION_OPTIONS = {
  "Video Call": "🎥",
  "Phone Call": "📞",
  "In-Person": "🧍",
  "Chat Only": "💬"
};

export default function StepCommunicationMode({ selected, onChange, onNext, onBack }) {
  const toggleMode = (mode) => {
    const updated = selected.includes(mode)
      ? selected.filter((m) => m !== mode)
      : [...selected, mode];
    onChange(updated);
  };

  return (
    <div className="step-container">
      <h1>How would you like to connect?</h1>

      <div className="chips-row">
        {Object.entries(COMMUNICATION_OPTIONS).map(([mode, emoji]) => (
          <button
            key={mode}
            className={`chip ${selected.includes(mode) ? "selected" : ""}`}
            onClick={() => toggleMode(mode)}
          >
            {emoji} {mode}
          </button>
        ))}
      </div>

      <div className="nav-buttons">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="next-button" onClick={onNext}>Next</button>
      </div>

      <div className="progress">Step 6 of 7</div>
    </div>
  );
}
