import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function HomePage() {
  return (
    <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-text-main)', marginBottom: '1rem' }}>Welcome to SilverGuide</h1>
      <p style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Connecting seniors with friendly volunteers for conversation, hobbies, and help.
      </p>
      
      {/* --- CARD PREVIEW SECTION --- */}
      <section style={{ marginBottom: '4rem', textAlign: 'left' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Card Design Options</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Goal: Avoid "dating app" feel. Look for friendly, community-focused styles.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Option A: Shadow Only */}
          <Card title="Option A: Clean Shadow" variant="shadow" hoverable hoverEffect="lift">
            <p>This style uses a soft shadow and white background. It's very modern and clean.</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '1rem' }}>
              <b>Hover Effect:</b> Lifts up slightly.
            </p>
          </Card>

          {/* Option B: Border Only */}
          <Card title="Option B: Structured Border" variant="border" hoverable hoverEffect="glow">
            <p>This style uses a solid border. It feels more like a "document" or "directory" entry.</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '1rem' }}>
              <b>Hover Effect:</b> Glows with blue border.
            </p>
          </Card>

          {/* Option C: Tinted Background */}
          <Card title="Option C: Friendly Tint" variant="tint" hoverable hoverEffect="fill">
            <p>This style uses a very faint blue background. It feels softer and less "stark" than white.</p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '1rem' }}>
              <b>Hover Effect:</b> Darkens slightly.
            </p>
          </Card>

        </div>
      </section>

      <section style={{ marginBottom: '4rem', textAlign: 'left' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Context: Volunteer Card Mockup</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Mockup: Dating App Vibe (To Avoid) */}
          <Card title="Sarah, 68" variant="shadow" hoverable>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
              <div>
                <p style={{ margin: 0 }}><b>Interests:</b> Gardening, Cooking</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>"Looking for a chat..."</p>
              </div>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
               <span style={{ color: 'red' }}>⚠ Too much like a profile?</span>
            </div>
          </Card>

          {/* Mockup: Community Directory Vibe (Better?) */}
          <Card title="Community Volunteer" variant="border" hoverable hoverEffect="glow">
             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#BDE0FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px' }}>🌿</span>
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Sarah Jenkins</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Verified Helper • 2 miles away</p>
              </div>
            </div>
            <p style={{ fontSize: '15px' }}>Can help with: <b>Gardening, Recipe Swapping</b></p>
            <Button size="small" variant="outline" fullWidth style={{ marginTop: '1rem' }}>View Availability</Button>
          </Card>

        </div>
      </section>
    </div>
  );
}

