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
    return { weekday, date: `${month}/${day}` };
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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#64748b',
              display: 'flex', alignItems: 'center'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        )}
        <div style={{ fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          Schedule with <span style={{ color: '#0d9488' }}>{volunteerName}</span>
        </div>
      </div>

      {/* Date picker (week view) */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ margin: "0 0 0.75rem 0", fontSize: "13px", fontWeight: "600", color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          1. Choose a day
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {uniqueAvailableDates.map((dateStr) => {
            const isSelected = dateStr === selectedDate;
            const { weekday, date } = formatDateLabel(dateStr);
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => handleDateClick(dateStr)}
                style={{
                  padding: "0.75rem 0.5rem",
                  borderRadius: "12px",
                  border: isSelected ? "2px solid #0d9488" : "1px solid #e2e8f0",
                  backgroundColor: isSelected ? "#f0fdfa" : "white",
                  color: isSelected ? "#0f766e" : "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: '4px',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? "0 4px 6px -1px rgba(13, 148, 136, 0.1)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: "500" }}>{weekday}</span>
                <span style={{ fontSize: "14px", fontWeight: "700" }}>{date}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slot picker */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ margin: "0 0 0.75rem 0", fontSize: "13px", fontWeight: "600", color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          2. Choose a time
        </p>

        {!selectedDate && (
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', color: '#94a3b8', fontSize: '14px' }}>
            Select a date above to see available times
          </div>
        )}

        {selectedDate && timeOptionsForSelectedDate.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fff1f2', borderRadius: '12px', border: '1px solid #fecaca', color: '#ef4444', fontSize: '14px' }}>
            No time slots available for this day.
          </div>
        )}

        {selectedDate && timeOptionsForSelectedDate.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: "0.75rem" }}>
            {timeOptionsForSelectedDate.map((slot) => {
              const isSelected = slot.time === selectedTime;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleTimeClick(slot.time)}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "8px",
                    border: isSelected ? "2px solid #0d9488" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#f0fdfa" : "white",
                    color: isSelected ? "#0f766e" : "#334155",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: isSelected ? "600" : "500",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? "0 2px 4px rgba(13, 148, 136, 0.1)" : "none"
                  }}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error + confirm */}
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '8px', 
          color: '#dc2626', 
          fontSize: '13px', 
          marginBottom: "1rem",
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: (!selectedDate || !selectedTime) ? '#cbd5e1' : "#0d9488",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          cursor: (!selectedDate || !selectedTime) ? 'not-allowed' : "pointer",
          transition: 'background-color 0.2s',
          marginTop: '1rem'
        }}
      >
        Confirm Schedule
      </button>
    </div>
  );
}
