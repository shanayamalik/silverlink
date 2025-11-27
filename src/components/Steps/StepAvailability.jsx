import React from "react";
import "../../styles/StepHelperType.css";

export const DAYS_OPTIONS = {
  Mon: "1️⃣",
  Tue: "2️⃣",
  Wed: "3️⃣",
  Thu: "4️⃣",
  Fri: "5️⃣",
  Sat: "6️⃣",
  Sun: "7️⃣"
};

export const TIMES_OPTION = {
  "Morning (9AM - 12PM)": "☀️",
  "Afternoon (1PM - 5PM)": "🌇", 
  "Evening (6PM - 10PM)": "🌙 ", 
  "Anytime works for me": "🕒 "
};


export default function StepAvailability({ availability, onChange, onNext, onBack }) {
  const anytimeSelected = availability.anytime === true;
  const toggleDay = (day) => {
    const newDays = availability.days.includes(day)
      ? availability.days.filter((d) => d !== day)
      : [...availability.days, day];
    onChange({ ...availability, days: newDays, anytime: false });
  };

  const toggleTime = (time) => {
    if (time.includes("Anytime")) {
        // Clear all other times and set only Anytime
        onChange({ days: [], times: ["🕒 Anytime works for me"], anytime: true });
      } else {
        // Normal toggle for specific times
        const newTimes = availability.times.includes(time)
          ? availability.times.filter((t) => t !== time)
          : [...availability.times.filter((t) => !t.includes("Anytime")), time];
        onChange({ ...availability, times: newTimes, anytime: false });
      }
  };

  const setAnytime = () => {
    onChange({ days: [], times: [], anytime: true });
  };

  return (
    <div className="step-container">
      <h1>When are you available?</h1>

      <h2>Days of the Week</h2>
      <div className="chips-row">
        {Object.entries(DAYS_OPTIONS).map(([day, emoji]) => (
          <button
            key={day}
            className={`chip ${availability.days.includes(day) ? "selected" : ""}`}
            onClick={() => toggleDay(day)}
          >
            {emoji} {day}
          </button>
        ))}
      </div>

      <h2>Time of Day</h2>
      <div className="chips-row">
        {Object.entries(TIMES_OPTION).map(([time, emoji]) => (
          <button
            key={time}
            className={`chip ${availability.times.includes(time) ? "selected" : ""}`}
            onClick={() => toggleTime(time)}
          >
            {emoji} {time}
          </button>
        ))}
      </div>


      <div className="nav-buttons">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="next-button" onClick={onNext}>Next</button>
      </div>

      <div className="progress">Step 2 of 7</div>
    </div>
  );
}
