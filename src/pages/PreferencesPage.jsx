import React from 'react';
import Header from '../components/common/Header';

export default function PreferencesPage() {
  // TODO: Implement logic to ask the user if they are looking to volunteer or need help (Help Type). This was previously part of the Voice Interview.
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <Header title="What brings you here today?" showHome />
      
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>This is the Preferences Page (Under Construction)</p>
        <p>Please proceed to <a href="/dashboard">Dashboard</a> to see your matches.</p>
      </div>
    </div>
  );
}
