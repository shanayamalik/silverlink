import React from "react";
import "../../styles/StepLanguage.css";

export const LANGUAGE_OPTIONS = {
  "English": "🇺🇸",
  "Spanish": "🇪🇸",
  "Chinese": "🇨🇳",
  "Tagalog": "🇵🇭",
  "French": "🇫🇷",
  "German": "🇩🇪",
  "Japanese": "🇯🇵",
  "Korean": "🇰🇷",
  "Others": "🌍"
};

export default function StepLanguage({ selected, onChange, onNext, onBack }) {
  const toggleLanguage = (lang) => {
    const updated = selected.includes(lang)
      ? selected.filter((l) => l !== lang)
      : [...selected, lang];
    onChange(updated);
  };

  return (
    <div className="step-container">
      <h1>Which languages do you prefer?</h1>

      <div className="chips-row">
        {Object.entries(LANGUAGE_OPTIONS).map(([lang, emoji]) => (
          <button
            key={lang}
            className={`chip ${selected.includes(lang) ? "selected" : ""}`}
            onClick={() => toggleLanguage(lang)}
          >
            {emoji} {lang}
          </button>
        ))}
      </div>

      <div className="nav-buttons">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="next-button" onClick={onNext}>Next</button>
      </div>

      <div className="progress">Step 4 of 7</div>
    </div>
  );
}
