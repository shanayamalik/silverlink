import React from 'react';
import Header from '../components/common/Header';

export default function PreferencesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <Header title="What brings you here today?" showBack showHome />
      
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>This is the Preferences Page (Under Construction)</p>
        <p>Please proceed to <a href="/volunteers">Volunteers Page</a> to see the welcome message again.</p>
      </div>
    </div>
  );
}
