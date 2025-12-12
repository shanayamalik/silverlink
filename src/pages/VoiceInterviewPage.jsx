import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { jsPDF } from "jspdf";

export default function VoiceInterviewPage() {
  const navigate = useNavigate();
  
  // Mock state
  const [transcript, setTranscript] = useState([
    { text: "Hi! I'm here to help match you with the right volunteer. Tell me a little about what you enjoy doing.", speaker: 'ai', timestamp: new Date().toISOString() }
  ]);
  const [interimText, setInterimText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [ttsGreetingSpoken, setTtsGreetingSpoken] = useState(false);
  const [showTtsTooltip, setShowTtsTooltip] = useState(true);
  const endRef = useRef(null);
  const interimTextRef = useRef('');
  const silenceTimerRef = useRef(null);
  /// for poor vision, use syc audio
  const speakText = (text) => {
    if (!text) return;
  
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Current browser does not support SpeechSynthesis TTS');
      return;
    }
  
    // Stop any ongoing speech before starting a new one
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';   // or 'zh-CN' if you later support Chinese
    utterance.rate = 0.92;       // speaking rate
    utterance.pitch = 1.2;      // voice pitch
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- Progress Logic ---
  const [progress, setProgress] = useState(0);
  // Speak initial AI greeting once when page loads (for low-vision users)
  

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimText, isProcessing]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimText, isProcessing]);
  // --- Analysis & Finish ---
  const handleFinishInterview = async () => {
    if (transcript.length < 2) {
      alert("Please have a short conversation first!");
      return;
    }
    
    setIsAnalyzing(true);
    // TODO: Implement a full-screen loading overlay with a friendly message (e.g., "SilverLink is writing your profile...") to improve user experience during the 5-10s wait.
    try {
      const response = await fetch('/api/analyze-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText}. Make sure the backend is running.`);
      }

      const data = await response.json();
      
      // Note: PDF generation is now handled in the ProfileCreationPage on demand
      
      // Navigate to Profile Creation with the data
      const analysisData = {
        summary: data.summaryMarkdown || data.summaryText,
        shortBio: data.structuredData?.shortBio || '',
        interests: data.structuredData?.interests || [],
        availability: data.structuredData?.availability || '',
        languages: data.structuredData?.languages || [],
        skills: data.structuredData?.skills || [],
        helpNeeded: data.structuredData?.helpNeeded || []
      };

      // Small delay to allow the user to see completion before navigating
      setTimeout(() => {
        navigate('/profile-creation', { state: { analysisData } });
      }, 1000);

    } catch (error) {
      console.error("Analysis failed:", error);
      // TODO: Implement a graceful "Retry" mechanism or allow manual skip to profile page with empty data if analysis fails repeatedly.
      alert(`Failed to analyze interview: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

    // --- AI Integration ---
    useEffect(() => {
      const lastMessage = transcript[transcript.length - 1];
  
      // Only trigger if the last message was from the user
      if (!lastMessage || lastMessage.speaker !== 'user') {
        return;
      }
  
      let cancelled = false;
  
      const fetchAIResponse = async () => {
        setIsProcessing(true);
        try {
          // Convert transcript to OpenAI / backend format
          const apiMessages = transcript.map(t => ({
            role: t.speaker === 'user' ? 'user' : 'assistant',
            content: t.text
          }));
  
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: apiMessages })
          });
  
          if (!response.ok) {
            const text = await response.text();
            throw new Error(`Chat API error: ${response.status} ${response.statusText} - ${text}`);
          }
  
          const data = await response.json();
          console.log('chat response:', data);
  
          if (cancelled) return;
  
          // Try multiple possible fields for the AI text
          const aiText =
            data.message ||
            data.reply ||
            data.content ||
            (data.choices && data.choices[0]?.message?.content) ||
            '';
  
          if (!aiText) {
            console.warn('No AI text found in /api/chat response');
            
            setTranscript(prev => [
              ...prev,
              {
                text: 'Sorry, I could not understand the response from the server.',
                speaker: 'ai',
                timestamp: new Date().toISOString(),
                highlights: []
              }
            ]);
            return;
          }
  
          // Append AI message to transcript
          setTranscript(prev => [
            ...prev,
            {
              text: aiText,
              speaker: 'ai',
              timestamp: new Date().toISOString(),
              highlights: [] // add extraction logic later
            }
          ]);
  
          // Update progress from backend if provided
          if (typeof data.progress === 'number') {
            setProgress(prev => Math.max(prev, data.progress));
          }
  
          // 🔊 Text-to-Speech for low-vision users
          if (ttsEnabled) {
            speakText(aiText);
          }
        } catch (error) {
          console.error('Error fetching AI response:', error);
         
          setTranscript(prev => [
            ...prev,
            {
              text: 'There was an error contacting the AI. Please try speaking again.',
              speaker: 'ai',
              timestamp: new Date().toISOString(),
              highlights: []
            }
          ]);
        } finally {
          if (!cancelled) {
            setIsProcessing(false);
          }
        }
      };
  
      fetchAIResponse();
  
      // Cleanup in case component unmounts while the request is in-flight
      return () => {
        cancelled = true;
      };
  
    }, [transcript, ttsEnabled]);
  // Real Speech Recognition Logic
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript;
        }
        setInterimText(fullTranscript);
        interimTextRef.current = fullTranscript;

        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          recognition.stop();
        }, 1500);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

        const finalText = interimTextRef.current;
        if (finalText.trim()) {
          setTranscript(prev => [...prev, { 
            text: finalText, 
            speaker: 'user', 
            timestamp: new Date().toISOString(),
            highlights: [] 
          }]);
          setInterimText('');
          interimTextRef.current = '';
        }
      };
      
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
  
    // On first tap: speak greeting and wait for it to finish before allowing mic
    if (!ttsGreetingSpoken) {
      speakGreetingOnce();
      // Don't start listening yet - user needs to tap again after greeting
      return;
    }

    if (isListening) {
      // Manual Stop
      recognitionRef.current.stop();
    } else {
      // Start
      try {
        setInterimText('');
        interimTextRef.current = '';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    }
  };

  // --- Shared Components ---

  const MicButton = ({ size = 'large', floating = false }) => (
    <button 
      onClick={toggleListening}
      style={{
        width: size === 'large' ? '64px' : '48px',
        height: size === 'large' ? '64px' : '48px',
        borderRadius: '50%',
        backgroundColor: isListening ? 'var(--color-error)' : 'var(--color-secondary)',
        color: isListening ? 'white' : '#333',
        border: '4px solid white',
        cursor: 'pointer',
        boxShadow: floating ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isListening ? 'scale(1.1)' : 'scale(1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10
      }}
    >
      {isListening ? (
        // Stop Icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
        </svg>
      ) : (
        // Mic Icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
          <path d="M19 10V11C19 14.53 16.39 17.44 13 17.93V21H11V17.93C7.61 17.44 5 14.53 5 11V10H7V11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11V10H19Z" fill="currentColor"/>
        </svg>
      )}
    </button>
  );

  const HighlightText = ({ text, highlights = [] }) => {
    if (!highlights.length) return text;
    const parts = text.split(new RegExp(`(${highlights.join('|')})`, 'gi'));
    return parts.map((part, i) => {
      const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
      return isHighlight ? (
        <span key={i} style={{ 
          backgroundColor: 'var(--color-success)', 
          padding: '0 4px', 
          borderRadius: '4px',
          fontWeight: '700' 
        }}>{part}</span>
      ) : part;
    });
  };

  // Speak the initial greeting when user first interacts (for Chrome autoplay policy)
  const speakGreetingOnce = () => {
    if (!ttsGreetingSpoken && typeof window !== 'undefined' && 'speechSynthesis' in window && ttsEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Hi! I'm here to help match you with the right volunteer. Tell me a little about what you enjoy doing."
      );
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      utterance.pitch = 1.2;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTtsGreetingSpoken(true);
    setShowTtsTooltip(false);
  };

  return (
    <div className="voice-interview-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)' }}>
      {/* Custom Header with TTS Toggle */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'white',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 50
      }}>
        {/* Left: Back + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
            aria-label="Go back"
          >
            ←
          </button>
          <span style={{ fontWeight: '600', fontSize: '18px', color: '#333' }}>Voice Interview</span>
        </div>

        {/* Right: TTS Toggle + Home */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* TTS Toggle Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                // If turning off, stop any currently playing speech
                if (ttsEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setTtsEnabled(!ttsEnabled);
                setShowTtsTooltip(false);
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: ttsEnabled ? '#E0F2F1' : '#F5F5F5',
                color: ttsEnabled ? '#0d7d74' : '#999',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'all 0.2s'
              }}
              title={ttsEnabled ? 'AI voice is on - click to mute' : 'AI voice is off - click to enable'}
              aria-label={ttsEnabled ? 'Mute AI voice' : 'Enable AI voice'}
            >
              {ttsEnabled ? (
                // Speaker On Icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              ) : (
                // Speaker Off Icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              )}
            </button>

            {/* Minimal Onboarding Tooltip */}
            {showTtsTooltip && (
              <div 
                onClick={() => setShowTtsTooltip(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '-8px',
                  marginTop: '8px',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  width: '180px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 100,
                  cursor: 'pointer'
                }}
              >
                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '18px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  transform: 'rotate(45deg)'
                }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    AI will read aloud
                  </div>
                  <div style={{ color: '#aaa', fontSize: '11px' }}>Tap icon to turn off</div>
                </div>
              </div>
            )}
          </div>

          {/* Home Button */}
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Go home"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto', width: '100%', overflowY: 'auto', paddingBottom: '160px' }}>
        {transcript.map((t, i) => (
          <div key={i} style={{
            width: '100%',
            backgroundColor: t.speaker === 'user' ? 'var(--color-primary-light)' : 'white',
            padding: '1rem 1.25rem',
            borderRadius: '16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            border: t.speaker === 'ai' ? '1px solid var(--color-border)' : '1px solid var(--color-primary)',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute', top: '-8px', left: '16px', 
              backgroundColor: t.speaker === 'user' ? 'var(--color-primary)' : 'var(--color-secondary)',
              color: t.speaker === 'user' ? '#000' : '#333',
              fontSize: '10px', fontWeight: '700', 
              padding: '2px 8px', borderRadius: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t.speaker === 'ai' ? 'SilverLink AI' : 'You'}
            </div>
            <div style={{ fontSize: '15px', marginTop: '6px', lineHeight: '1.5', color: '#333' }}>
              <HighlightText text={t.text} highlights={t.highlights} />
            </div>
          </div>
        ))}
        {interimText && (
          <div style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px dashed var(--color-primary)', backgroundColor: 'rgba(255,255,255,0.5)' }}>
            <div style={{ fontSize: '15px', color: '#666', fontStyle: 'italic' }}>{interimText}</div>
          </div>
        )}
        
        {/* AI Processing Indicator */}
        {isProcessing && (
          <div style={{ width: '100%', padding: '1rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
            <span style={{ fontSize: '12px', color: '#999', marginLeft: '0.5rem' }}>SilverLink is thinking...</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Fixed Controls Layer */}
      
      {/* Mic Button (Center) with hint */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <MicButton size="large" floating />
        {/* Before greeting - show "Tap to start" */}
        {!isListening && !ttsGreetingSpoken && (
          <div style={{
            fontSize: '13px',
            color: '#555',
            backgroundColor: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            <span style={{ fontWeight: '600' }}>Tap to start</span>
            <span style={{ color: '#888' }}> — I'll introduce myself!</span>
          </div>
        )}
        {/* After greeting, before user responds - show "Tap to respond" */}
        {!isListening && ttsGreetingSpoken && transcript.length <= 1 && (
          <div style={{
            fontSize: '13px',
            color: '#555',
            backgroundColor: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <span style={{ fontWeight: '600' }}>Tap to respond</span>
          </div>
        )}
        {/* After first exchange - show smaller hint */}
        {!isListening && transcript.length > 1 && (
          <div style={{
            fontSize: '12px',
            color: '#888',
            backgroundColor: 'white',
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            Tap when ready to respond
          </div>
        )}
        {isListening && (
          <div style={{
            fontSize: '13px',
            color: 'var(--color-error)',
            fontWeight: '600',
            backgroundColor: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: 'var(--color-error)', 
              borderRadius: '50%',
              animation: 'pulse 1s infinite'
            }}></span>
            Listening... tap to stop
          </div>
        )}
      </div>

      {/* Generate Button (Right) */}
      {transcript.length > 0 && (
        <div style={{ position: 'fixed', bottom: '2.5rem', right: '2rem', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          
          {/* Completion Hint Bubble */}
          {progress >= 100 && !isAnalyzing && (
            <div style={{
              backgroundColor: 'white',
              color: '#333',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #E0E0E0',
              animation: 'fadeIn 0.5s ease-out',
              maxWidth: '200px',
              textAlign: 'left',
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {/* Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              
              <span style={{ lineHeight: '1.3' }}>Profile ready! You can generate now or keep chatting to share more detail.</span>

              {/* Pointer (Triangle) */}
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '24px',
                width: '0',
                height: '0',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid white',
                zIndex: 2
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-7.5px',
                right: '24px',
                width: '0',
                height: '0',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #E0E0E0',
                zIndex: 1
              }}></div>
            </div>
          )}

          <button 
            onClick={handleFinishInterview}
            disabled={progress < 100 || isAnalyzing || isProcessing || isListening}
            style={{
              padding: '12px 28px',
              backgroundColor: progress >= 100 ? 'var(--color-secondary)' : '#F5F5F5',
              color: progress >= 100 ? '#333' : '#888',
              border: progress >= 100 ? 'none' : '1px solid #E0E0E0',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: progress >= 100 ? 'pointer' : 'default',
              boxShadow: progress >= 100 ? '0 4px 16px rgba(220, 208, 255, 0.6)' : 'none',
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: (isAnalyzing || isProcessing || isListening) ? 0.6 : 1,
              minWidth: '180px',
              justifyContent: 'center'
            }}
          >
            {progress < 100 ? (
              <>
                <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                  {/* Background Circle */}
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="#C0C0C0" strokeWidth="3.5" />
                    {/* Progress Circle */}
                    <circle 
                      cx="10" cy="10" r="8" fill="none" stroke="#9370DB" strokeWidth="3.5" 
                      strokeDasharray="50.26" 
                      strokeDashoffset={50.26 * (1 - progress / 100)}
                      transform="rotate(-90 10 10)"
                      style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                  </svg>
                </div>
                <span style={{ fontSize: '14px' }}>Gathering Info...</span>
              </>
            ) : (
              <>
                {isAnalyzing ? 'Generating...' : 'Generate My Profile'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
