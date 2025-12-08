// TODO: Create SchedulingCalendar component for MEDIUM TASK
//
// Props to implement:
// - volunteerId: ID of selected volunteer
// - volunteerName: name to display
// - onSchedule: callback with selected date/time
// - availableSlots: array of available time slots (or mock data)
//
// Features:
// - Simple calendar view (week or 2-week view)
// - Large, tap-friendly date buttons
// - Time slot picker after date selection
// - Common time slots: Morning, Afternoon, Evening (or specific times)
// - Visual feedback for selected date/time
// - Confirmation button that passes selection to parent
//
// Time slot format:
// {
//   date: '2025-11-25',
//   time: '10:00 AM' | '2:00 PM' | '6:00 PM',
//   duration: 30 (minutes)
// }
//
// Accessibility:
// - Large buttons (min 50x50px for dates)
// - Clear labels for all times
// - Keyboard navigation support
//
// Example usage:
// <SchedulingCalendar 
//   volunteerId={volunteer.id}
//   volunteerName={volunteer.name}
//   onSchedule={(slot) => handleSchedule(slot)}
//   availableSlots={mockAvailability}
// />


import React, { useMemo, useState } from "react";

export default function SchedulingCalendar({
  volunteerId,
  volunteerName,
  onSchedule,
  availableSlots = [],
  onBack,
}) {
  const [selectedDate, setSelectedDate] = useState(null); // 'YYYY-MM-DD'
  const [selectedTime, setSelectedTime] = useState(null); // '10:00 AM', etc.
  const [error, setError] = useState("");

  // Default simple time slots if no specific times provided
  const defaultTimeSlots = [
    { label: "Morning", time: "10:00 AM", duration: 30 },
    { label: "Afternoon", time: "2:00 PM", duration: 30 },
    { label: "Evening", time: "6:00 PM", duration: 30 },
  ];

  // Utility: format date into a simple label like "Tue 11/26"
  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;

    const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
    const month = d.toLocaleDateString(undefined, { month: "numeric" });
    const day = d.toLocaleDateString(undefined, { day: "numeric" });
    return `${weekday} ${month}/${day}`;
  };

  // Generate 7 days starting today if no availableSlots given
  const fallbackDates = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD
      result.push(iso);
    }
    return result;
  }, []);

  // If availableSlots is provided, use its dates; otherwise fallback
  const uniqueAvailableDates = useMemo(() => {
    if (!availableSlots || availableSlots.length === 0) return fallbackDates;
    const set = new Set(availableSlots.map((s) => s.date));
    return Array.from(set);
  }, [availableSlots, fallbackDates]);

  // Time options for the currently selected date
  const timeOptionsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];

    if (availableSlots && availableSlots.length > 0) {
      const slotsForDate = availableSlots.filter((s) => s.date === selectedDate);
      return slotsForDate.map((slot) => ({
        label: slot.time,
        time: slot.time,
        duration: slot.duration ?? 30,
      }));
    }

    return defaultTimeSlots;
  }, [selectedDate, availableSlots]);

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedTime(null);
    setError("");
  };

  const handleTimeClick = (timeStr) => {
    setSelectedTime(timeStr);
    setError("");
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please choose both a date and a time.");
      return;
    }

    let duration = 30;
    if (availableSlots && availableSlots.length > 0) {
      const matched = availableSlots.find(
        (s) => s.date === selectedDate && s.time === selectedTime
      );
      if (matched && matched.duration) {
        duration = matched.duration;
      }
    } else {
      const matchDefault = defaultTimeSlots.find((t) => t.time === selectedTime);
      if (matchDefault && matchDefault.duration) {
        duration = matchDefault.duration;
      }
    }

    const slot = {
      volunteerId,
      volunteerName,
      date: selectedDate,
      time: selectedTime,
      duration,
    };

    onSchedule?.(slot);
  };

  const handleKeyDown = (e, onActivate) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <div>
      {/* go back */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: 18,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #155d27",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back
        </button>
      )}

      <div
        style={{
          marginBottom: "1.5rem",
          fontSize: 14,
          color: "#555",
          textAlign: "center",
        }}
      >
        Scheduling with <strong>{volunteerName}</strong>
      </div>

      {/* Date picker (week view) */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          1. Choose a day
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {uniqueAvailableDates.map((dateStr) => {
            const isSelected = dateStr === selectedDate;
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => handleDateClick(dateStr)}
                onKeyDown={(e) => handleKeyDown(e, () => handleDateClick(dateStr))}
                aria-pressed={isSelected}
                style={{
                  minHeight: 50,
                  minWidth: 50,
                  padding: "0.5rem",
                  borderRadius: 12,
                  border: isSelected ? "2px solid #1B5E20" : "1px solid #ccc",
                  backgroundColor: isSelected ? "#E8F5E9" : "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isSelected ? "0 0 0 2px rgba(25, 118, 210, 0.2)" : "none",
                }}
              >
                {formatDateLabel(dateStr)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slot picker */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          2. Choose a time
        </p>

        {!selectedDate && (
          <p style={{ fontSize: 13, color: "#888" }}>
            Please pick a day first. Time options will appear here.
          </p>
        )}

        {selectedDate && timeOptionsForSelectedDate.length === 0 && (
          <p style={{ fontSize: 13, color: "#888" }}>
            No time slots available for this day. Please choose another date.
          </p>
        )}

        {selectedDate && timeOptionsForSelectedDate.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {timeOptionsForSelectedDate.map((slot) => {
              const isSelected = slot.time === selectedTime;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleTimeClick(slot.time)}
                  onKeyDown={(e) =>
                    handleKeyDown(e, () => handleTimeClick(slot.time))
                  }
                  aria-pressed={isSelected}
                  style={{
                    minHeight: 50,
                    minWidth: 90,
                    padding: "0.5rem 0.75rem",
                    borderRadius: 999,
                    border: isSelected ? "2px solid #1B5E20" : "1px solid #ccc",
                    backgroundColor: isSelected ? "#E8F5E9" : "#fff",
                    cursor: "pointer",
                    fontSize: 13,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>{slot.time}</span>
                  {slot.label && (
                    <span style={{ fontSize: 11, color: "#666" }}>
                      {slot.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error + confirm */}
      {error && (
        <p style={{ color: "#c62828", fontSize: 13, marginBottom: "0.75rem" }}>
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: 999,
          border: "none",
          backgroundColor: "#1976d2",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Confirm chat time
      </button>
    </div>
  );
}