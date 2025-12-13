import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SchedulingPreviewPage() {
  const navigate = useNavigate();
  const [currentDesign, setCurrentDesign] = useState('OptionA');

  // Mock Data
  const volunteer = {
    id: 14,
    name: "Henry Nakamura",
    avatar: "🎮",
    interests: ["Chess", "History", "Strategy Games"]
  };
  
  const selectedSlot = {
    date: "2025-12-15",
    time: "10:00 AM",
    weekday: "Monday"
  };

  // --- OPTION A: The "Planner" (Structured Form) ---
  const OptionA = () => {
    const [formData, setFormData] = useState({
      title: "Friendly Visit",
      location: "My Home",
      notes: ""
    });

    const eventTypes = ["Friendly Visit", "Coffee Chat", "Walk in the Park", "Game Night", "Tech Help"];
    const locations = ["My Home", "Community Center", "Virtual Call", "Local Cafe"];

    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#0f766e', padding: '20px', color: 'white' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Finalize Details</h2>
          <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
            Scheduling with {volunteer.name}
          </p>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Date & Time Summary */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', padding: '12px', backgroundColor: '#f0fdfa', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
            <div style={{ fontSize: '24px' }}>📅</div>
            <div>
              <div style={{ fontWeight: '600', color: '#0f766e' }}>{selectedSlot.weekday}, Dec 15</div>
              <div style={{ fontSize: '14px', color: '#334155' }}>{selectedSlot.time} (30 mins)</div>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Event Title */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                What would you like to do?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {eventTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, title: type})}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: formData.title === type ? '1px solid #0d9488' : '1px solid #e2e8f0',
                      backgroundColor: formData.title === type ? '#f0fdfa' : 'white',
                      color: formData.title === type ? '#0f766e' : '#64748b',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Or type your own..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            {/* Location */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                Where should we meet?
              </label>
              <select 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: 'white' }}
              >
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
                Any notes for {volunteer.name.split(' ')[0]}? <span style={{fontWeight: '400', color: '#94a3b8'}}>(Optional)</span>
              </label>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="E.g., I'll bring the chess board!"
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
              />
            </div>

          </div>

          {/* Actions */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>
              Back
            </button>
            <button style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#0d9488', color: 'white', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(13, 148, 136, 0.2)' }}>
              Send Invitation
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- OPTION B: The "Invitation" (Visual Card) ---
  const OptionB = () => {
    const [title, setTitle] = useState("Chess Game");
    const [location, setLocation] = useState("My Home");
    const [note, setNote] = useState("");

    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {/* Ticket Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', 
            padding: '30px 24px', 
            color: 'white',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, marginBottom: '8px' }}>
              New Event Request
            </div>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                borderBottom: '2px solid rgba(255,255,255,0.3)', 
                color: 'white', 
                fontSize: '28px', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                width: '100%',
                outline: 'none',
                paddingBottom: '4px'
              }}
            />
            <div style={{ position: 'absolute', bottom: -12, left: 0, right: 0, height: '24px', backgroundColor: 'white', borderRadius: '24px 24px 0 0' }}></div>
          </div>

          {/* Ticket Body */}
          <div style={{ padding: '10px 30px 30px 30px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 4px' }}>👤</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>You</div>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '20px' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 4px' }}>{volunteer.avatar}</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>{volunteer.name.split(' ')[0]}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Time Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🕒</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>When</div>
                  <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>{selectedSlot.weekday}, Dec 15 • {selectedSlot.time}</div>
                </div>
              </div>

              {/* Location Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📍</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Where</div>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ 
                      width: '100%', border: 'none', fontSize: '16px', color: '#1e293b', fontWeight: '500', 
                      backgroundColor: 'transparent', padding: '0', cursor: 'pointer', outline: 'none',
                      textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '4px'
                    }}
                  >
                    <option>My Home</option>
                    <option>Community Center</option>
                    <option>Virtual Call</option>
                    <option>Local Cafe</option>
                  </select>
                </div>
              </div>

              {/* Note Row */}
              <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f8fafc', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>��</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Note</div>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a message..."
                    rows={2}
                    style={{ 
                      width: '100%', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '8px', 
                      fontSize: '14px', fontFamily: 'inherit', resize: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            <button style={{ 
              width: '100%', marginTop: '30px', padding: '16px', 
              borderRadius: '16px', border: 'none', 
              backgroundColor: '#1e293b', color: 'white', 
              fontSize: '16px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <span>Confirm Request</span>
              <span>→</span>
            </button>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#1e293b', marginBottom: '10px' }}>Enhanced Scheduling Options</h1>
          <p style={{ color: '#64748b' }}>Previewing new "Event Details" step after selecting a time.</p>
          
          <div style={{ display: 'inline-flex', backgroundColor: 'white', padding: '4px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setCurrentDesign('OptionA')}
              style={{
                padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: currentDesign === 'OptionA' ? '#0f766e' : 'transparent',
                color: currentDesign === 'OptionA' ? 'white' : '#64748b',
                fontWeight: '600'
              }}
            >
              Option A: The Planner
            </button>
            <button 
              onClick={() => setCurrentDesign('OptionB')}
              style={{
                padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                backgroundColor: currentDesign === 'OptionB' ? '#0f766e' : 'transparent',
                color: currentDesign === 'OptionB' ? 'white' : '#64748b',
                fontWeight: '600'
              }}
            >
              Option B: The Invitation
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {currentDesign === 'OptionA' ? <OptionA /> : <OptionB />}
        </div>

      </div>
    </div>
  );
}
