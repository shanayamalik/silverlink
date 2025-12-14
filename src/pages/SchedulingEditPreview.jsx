import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SchedulingEditPreview() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const mockVisit = {
    id: 1,
    volunteerName: 'Grace Okafor',
    volunteerId: '13',
    date: '2025-12-12',
    time: '10:00 AM',
    activity: 'Coffee & Chat',
    location: 'At Home',
    color: 'green'
  };

  const mockVolunteers = [
    { id: '13', name: 'Grace Okafor' },
    { id: '14', name: 'Henry Nakamura' },
    { id: '15', name: 'Patricia Reyes' }
  ];

  const activityOptions = [
    'Coffee & Chat',
    'Chess Game',
    'Walk in the Park',
    'Grocery Shopping',
    'Doctor Appointment',
    'Cooking Together',
    'Tech Support',
    'Reading Session',
    'Other'
  ];

  const locationOptions = [
    'At Home',
    'Community Center',
    'Park',
    'Library',
    'Coffee Shop',
    'Grocery Store',
    'Medical Office',
    'Other'
  ];

  const meetingTypeOptions = [
    'Video Call',
    'Phone Call',
    'In-Person Visit',
    'Text/Message'
  ];

  const virtualLocationOptions = [
    'Zoom',
    'Phone Call',
    'FaceTime',
    'Google Meet',
    'WhatsApp Video',
    'In-Person'
  ];

  const timeOptions = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  const [editData, setEditData] = useState({ ...mockVisit });

  // Option A: Inline Edit (Minimalist)
  const OptionA = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '600px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1.5rem' }}>
        Edit Visit
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          value={editData.activity}
          onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
          placeholder="Activity"
        />
        
        <input
          type="text"
          value={editData.location}
          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
          placeholder="Location"
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            style={{
              padding: '10px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
          
          <input
            type="text"
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            style={{
              padding: '10px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
            placeholder="Time"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </div>
    </div>
  );

  // Option B: Card Style with Labels
  const OptionB = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', maxWidth: '600px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
          Visit Details
        </h3>
        <span style={{ fontSize: '12px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '12px' }}>
          with {editData.volunteerName}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Activity
          </label>
          <input
            type="text"
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Location
          </label>
          <input
            type="text"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Date
            </label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Time
            </label>
            <input
              type="text"
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', justifyContent: 'space-between' }}>
        <button style={{
          padding: '10px 18px',
          backgroundColor: 'transparent',
          color: '#dc2626',
          border: '1px solid #dc2626',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Delete
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            padding: '10px 18px',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '10px 18px',
            backgroundColor: '#0d9488',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  // Option C: Soft Pill Style
  const OptionC = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '2rem', maxWidth: '600px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' }}>
        ✏️ Edit Visit with {editData.volunteerName.split(' ')[0]}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '12px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
            What are you doing?
          </label>
          <input
            type="text"
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: 'none',
              backgroundColor: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '12px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
            Where?
          </label>
          <input
            type="text"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              border: 'none',
              backgroundColor: 'white',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              When?
            </label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                border: 'none',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              Time
            </label>
            <input
              type="text"
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                border: 'none',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '13px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
        <button style={{
          flex: 1,
          padding: '12px',
          backgroundColor: '#f1f5f9',
          color: '#64748b',
          border: 'none',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          flex: 1,
          padding: '12px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Save ✓
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option D: Compact Side-by-Side
  const OptionD = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '700px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
        Edit: {editData.activity}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Activity</label>
          <input
            type="text"
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Location</label>
          <input
            type="text"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Date</label>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Time</label>
          <input
            type="text"
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{
          padding: '8px 14px',
          backgroundColor: 'transparent',
          color: '#dc2626',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          🗑 Delete
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 14px',
            backgroundColor: 'transparent',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0d9488',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Save
          </button>
        </div>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option E: Compact Grid + Dropdowns (Hybrid of D + C delete style)
  const OptionE = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '700px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
        Edit Visit
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Volunteer</label>
          <select
            value={editData.volunteerId}
            onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {mockVolunteers.map(vol => (
              <option key={vol.id} value={vol.id}>{vol.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Activity</label>
          <select
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {activityOptions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Location</label>
          <select
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {locationOptions.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Time</label>
          <select
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Date</label>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '8px 14px',
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option F: Full Dropdowns with Icons
  const OptionF = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '2rem', maxWidth: '650px' }}>
      <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', marginBottom: '1.5rem' }}>
        Edit Visit Details
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '20px', width: '36px', textAlign: 'center' }}>👤</div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Volunteer</label>
            <select
              value={editData.volunteerId}
              onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
            >
              {mockVolunteers.map(vol => (
                <option key={vol.id} value={vol.id}>{vol.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '20px', width: '36px', textAlign: 'center' }}>🎯</div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activity</label>
            <select
              value={editData.activity}
              onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
            >
              {activityOptions.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '20px', width: '36px', textAlign: 'center' }}>📍</div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</label>
            <select
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
            >
              {locationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '20px', width: '36px', textAlign: 'center' }}>📅</div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</label>
              <input
                type="date"
                value={editData.date}
                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '20px', width: '36px', textAlign: 'center' }}>🕐</div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</label>
              <select
                value={editData.time}
                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '10px 18px',
          backgroundColor: '#f8fafc',
          color: '#64748b',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '10px 18px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Save Changes
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '16px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option G: Minimal Dropdowns (Very Clean)
  const OptionG = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '600px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1.25rem' }}>
        Edit Visit
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <select
          value={editData.volunteerId}
          onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
          style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
        >
          {mockVolunteers.map(vol => (
            <option key={vol.id} value={vol.id}>Meet with {vol.name}</option>
          ))}
        </select>
        
        <select
          value={editData.activity}
          onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
          style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
        >
          {activityOptions.map(act => (
            <option key={act} value={act}>{act}</option>
          ))}
        </select>
        
        <select
          value={editData.location}
          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
          style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
        >
          {locationOptions.map(loc => (
            <option key={loc} value={loc}>📍 {loc}</option>
          ))}
        </select>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }}
          />
          
          <select
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
          >
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '8px 16px',
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option H: Card with Colored Sections
  const OptionH = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', maxWidth: '650px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
          Edit Visit
        </h3>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#fef3c7', borderRadius: '10px', padding: '12px', border: '1px solid #fde68a' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: '#92400e', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Who are you meeting?
          </label>
          <select
            value={editData.volunteerId}
            onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
            style={{ width: '100%', padding: '8px 10px', border: 'none', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
          >
            {mockVolunteers.map(vol => (
              <option key={vol.id} value={vol.id}>{vol.name}</option>
            ))}
          </select>
        </div>
        
        <div style={{ backgroundColor: '#dbeafe', borderRadius: '10px', padding: '12px', border: '1px solid #bfdbfe' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: '#1e40af', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            What are you doing?
          </label>
          <select
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: 'none', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
          >
            {activityOptions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
        
        <div style={{ backgroundColor: '#dcfce7', borderRadius: '10px', padding: '12px', border: '1px solid #bbf7d0' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: '#166534', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Where?
          </label>
          <select
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: 'none', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
          >
            {locationOptions.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: '#f3e8ff', borderRadius: '10px', padding: '12px', border: '1px solid #e9d5ff' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#6b21a8', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              When?
            </label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: 'none', borderRadius: '6px', fontSize: '13px' }}
            />
          </div>
          
          <div style={{ backgroundColor: '#ffe4e6', borderRadius: '10px', padding: '12px', border: '1px solid #fecdd3' }}>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#9f1239', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Time
            </label>
            <select
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: 'none', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer', backgroundColor: 'white' }}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '1rem 1.5rem', backgroundColor: '#f8fafc', display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0' }}>
        <button style={{
          padding: '10px 18px',
          backgroundColor: 'white',
          color: '#64748b',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '10px 18px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Save Changes
        </button>
      </div>
      
      <button style={{
        width: '100%',
        padding: '12px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option I: Virtual-First Design (Based on E, improved)
  const OptionI = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '700px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
        Edit Visit
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Volunteer</label>
          <select
            value={editData.volunteerId}
            onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {mockVolunteers.map(vol => (
              <option key={vol.id} value={vol.id}>{vol.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Activity</label>
          <select
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {activityOptions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Meeting Type</label>
          <select
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {virtualLocationOptions.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Time</label>
          <select
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Date</label>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{
          padding: '8px 14px',
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  // Option J: Hybrid Dropdown + Custom Input
  const OptionJ = () => {
    const [customLocation, setCustomLocation] = useState('');
    const [showCustomLocation, setShowCustomLocation] = useState(false);
    
    return (
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '700px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
          Edit Visit
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Volunteer</label>
            <select
              value={editData.volunteerId}
              onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {mockVolunteers.map(vol => (
                <option key={vol.id} value={vol.id}>{vol.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Activity</label>
            <select
              value={editData.activity}
              onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {activityOptions.map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
            </select>
          </div>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Meeting Type</label>
            <select
              value={showCustomLocation ? 'custom' : editData.location}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setShowCustomLocation(true);
                } else {
                  setShowCustomLocation(false);
                  setEditData({ ...editData, location: e.target.value });
                }
              }}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {virtualLocationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
              <option value="custom">📝 Custom location...</option>
            </select>
            {showCustomLocation && (
              <input
                type="text"
                value={customLocation}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  setEditData({ ...editData, location: e.target.value });
                }}
                placeholder="Enter specific location or meeting link"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', marginTop: '8px' }}
              />
            )}
          </div>
          
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Date</label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px', display: 'block' }}>Time</label>
            <select
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{
            padding: '8px 14px',
            backgroundColor: 'transparent',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#0d9488',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Save
          </button>
        </div>
        
        <button style={{
          width: '100%',
          marginTop: '12px',
          padding: '10px',
          backgroundColor: 'transparent',
          color: '#dc2626',
          border: 'none',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}>
          Delete this visit
        </button>
      </div>
    );
  };

  // Option K: Simple Virtual with Icons
  const OptionK = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', maxWidth: '600px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '1.25rem' }}>
        Edit Visit
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px', width: '28px' }}>👤</span>
          <select
            value={editData.volunteerId}
            onChange={(e) => setEditData({ ...editData, volunteerId: e.target.value, volunteerName: mockVolunteers.find(v => v.id === e.target.value)?.name })}
            style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {mockVolunteers.map(vol => (
              <option key={vol.id} value={vol.id}>{vol.name}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px', width: '28px' }}>🎯</span>
          <select
            value={editData.activity}
            onChange={(e) => setEditData({ ...editData, activity: e.target.value })}
            style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {activityOptions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px', width: '28px' }}>💻</span>
          <select
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            {virtualLocationOptions.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px', width: '28px' }}>📅</span>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px', width: '28px' }}>🕐</span>
            <select
              value={editData.time}
              onChange={(e) => setEditData({ ...editData, time: e.target.value })}
              style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{
          padding: '8px 14px',
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#0d9488',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Save
        </button>
      </div>
      
      <button style={{
        width: '100%',
        marginTop: '12px',
        padding: '10px',
        backgroundColor: 'transparent',
        color: '#dc2626',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}>
        Delete this visit
      </button>
    </div>
  );

  const options = [
    { id: 'A', name: 'Minimalist', component: OptionA, description: 'Clean and simple' },
    { id: 'B', name: 'Card with Labels', component: OptionB, description: 'Clear structure with emphasis' },
    { id: 'C', name: 'Soft Pill', component: OptionC, description: 'Friendly and rounded' },
    { id: 'D', name: 'Compact Grid', component: OptionD, description: 'Space-efficient layout' },
    { id: 'E', name: 'Grid + Dropdowns', component: OptionE, description: 'Compact with all dropdowns' },
    { id: 'F', name: 'Icons + Dropdowns', component: OptionF, description: 'Visual with emoji icons' },
    { id: 'G', name: 'Minimal Dropdowns', component: OptionG, description: 'Ultra-clean dropdown style' },
    { id: 'H', name: 'Colored Sections', component: OptionH, description: 'Color-coded fields' },
    { id: 'I', name: 'Virtual-First (E Improved)', component: OptionI, description: 'Option E with virtual meetings & better cancel' },
    { id: 'J', name: 'Hybrid Input', component: OptionJ, description: 'Dropdown + custom location option' },
    { id: 'K', name: 'Simple Virtual', component: OptionK, description: 'Clean virtual design with icons' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginBottom: '1.5rem',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          ← Back to Dashboard
        </button>

        <div style={{ backgroundColor: '#E0F2FE', border: '1px solid #BAE6FD', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', color: '#0369A1', marginBottom: '0.5rem' }}>
            Scheduling Edit Design Options
          </h1>
          <p style={{ color: '#0369A1', fontSize: '14px', lineHeight: '1.6' }}>
            Compare different designs for the visit editing interface. The "Reschedule" button has been removed - "Edit" now handles everything.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {options.map(option => (
            <div key={option.id}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem',
                border: selectedOption === option.id ? '2px solid #0d9488' : '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                      Option {option.id}: {option.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                      {option.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: selectedOption === option.id ? '#0d9488' : 'transparent',
                      color: selectedOption === option.id ? 'white' : '#0d9488',
                      border: `1px solid #0d9488`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {selectedOption === option.id ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <option.component />
              </div>
            </div>
          ))}
        </div>

        {selectedOption && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0d9488',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              Implement Option {selectedOption}?
            </span>
            <button
              onClick={() => alert(`You selected Option ${selectedOption}. I'll implement this design!`)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#0d9488',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
