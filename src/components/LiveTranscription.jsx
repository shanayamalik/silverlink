import React, { useEffect, useRef } from 'react';

/**
 * LiveTranscription Component
 * Displays real-time conversation history and interim speech results.
 * 
 * @param {Object} props
 * @param {Array} props.transcript - Array of completed transcript objects
 *   [{ text: string, speaker: 'user'|'ai', timestamp: string, highlights: string[] }]
 * @param {string} props.interimText - Real-time text currently being spoken by user
 * @param {boolean} props.isListening - Whether the microphone is active
 */
export default function LiveTranscription({ transcript = [], interimText = '', isListening }) {
  const endOfTranscriptRef = useRef(null);

  // Auto-scroll to bottom when transcript updates
  useEffect(() => {
    endOfTranscriptRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimText]);

  // Helper to render text with bold highlights
  const renderTextWithHighlights = (text, highlights = []) => {
    if (!highlights || highlights.length === 0) return text;

    // Simple case-insensitive replacement for highlighting
    const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'gi'));
    
    return parts.map((part, i) => {
      const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
      return isHighlight ? (
        <strong key={i} style={{ color: 'var(--color-text-main)', fontWeight: '800', backgroundColor: 'var(--color-success)', padding: '0 4px', borderRadius: '4px' }}>{part}</strong>
      ) : (
        part
      );
    });
  };

  return (
    <div className="live-transcription" style={{
      flex: 1,
      overflowY: 'auto',
      padding: '1.5rem',
      backgroundColor: 'transparent', // Let parent handle background
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      minHeight: '300px',
      maxHeight: '600px'
    }}>
      {transcript.length === 0 && !interimText && (
        <div style={{ 
          textAlign: 'center', 
          color: 'var(--color-text-muted)', 
          marginTop: '2rem',
          fontStyle: 'italic',
          fontSize: 'var(--font-size-lg)'
        }}>
          Conversation will appear here...
        </div>
      )}

      {transcript.map((line, index) => (
        <div 
          key={index} 
          style={{
            alignSelf: line.speaker === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            backgroundColor: line.speaker === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
            color: 'var(--color-text-main)',
            padding: '1.25rem',
            borderRadius: line.speaker === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            boxShadow: 'var(--shadow-sm)',
            border: line.speaker === 'ai' ? '1px solid var(--color-border)' : 'none'
          }}
        >
          <div style={{ 
            fontSize: 'var(--font-size-sm)', 
            color: line.speaker === 'user' ? '#444' : 'var(--color-text-muted)', 
            marginBottom: '6px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {line.speaker === 'ai' ? 'SilverGuide AI' : 'You'}
          </div>
          <div style={{ fontSize: 'var(--font-size-lg)', lineHeight: '1.6' }}>
            {renderTextWithHighlights(line.text, line.highlights)}
          </div>
        </div>
      ))}

      {/* Real-time Interim Result (Ghost Text) */}
      {isListening && interimText && (
        <div style={{
          alignSelf: 'flex-end',
          maxWidth: '85%',
          backgroundColor: 'rgba(189, 224, 254, 0.3)', // Transparent Primary
          padding: '1.25rem',
          borderRadius: '20px 20px 4px 20px',
          border: '2px dashed var(--color-primary)'
        }}>
          <div style={{ 
            fontSize: 'var(--font-size-sm)', 
            color: 'var(--color-text-muted)', 
            marginBottom: '6px',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}>
            You (Speaking...)
          </div>
          <div style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            {interimText}
          </div>
        </div>
      )}

      {/* Listening Indicator (Pulse) */}
      {isListening && !interimText && (
        <div style={{
          alignSelf: 'flex-end',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-base)',
          fontStyle: 'italic',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          padding: '0.5rem 1rem',
          borderRadius: '20px'
        }}>
          <span className="listening-dot" style={{
            width: '10px', height: '10px', backgroundColor: 'var(--color-error)', borderRadius: '50%', display: 'inline-block'
          }}></span>
          Listening...
        </div>
      )}

      <div ref={endOfTranscriptRef} />
    </div>
  );
}
