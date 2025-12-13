import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';

export default function ChatPage() {
  const { volunteerId } = useParams();
  const location = useLocation();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);
  
  // Mock Volunteer Data (fallback if not passed in state)
  const volunteer = location.state?.volunteer || {
    id: volunteerId || 1,
    name: 'Sarah Jenkins',
    avatar: '👩‍🏫',
    role: 'Reading Companion',
    interests: ['Reading', 'Teaching', 'History']
  };

  // Chat History - Start empty or with passed history
  const [messages, setMessages] = useState(location.state?.history || []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial Greeting
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;
      fetchVolunteerResponse([]);
    }
  }, []);

  const fetchVolunteerResponse = async (currentMessages) => {
    setIsTyping(true);
    try {
      // Format messages for API (role: 'user' | 'assistant')
      const apiMessages = currentMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('http://localhost:3001/api/volunteer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: apiMessages,
          volunteer: volunteer
        })
      });

      const data = await response.json();
      
      if (data.message) {
        const botMessage = {
          id: Date.now(),
          sender: 'volunteer',
          text: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      // Fallback error message
      const errorMessage = {
        id: Date.now(),
        sender: 'volunteer',
        text: "I'm having a little trouble connecting right now. Can we try again in a moment?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    
    // Trigger AI response
    fetchVolunteerResponse(updatedMessages);
  };

  // Minimalist Styles
  const styles = {
    container: { backgroundColor: '#ffffff', minHeight: '100vh' },
    chatWindow: { backgroundColor: 'white', border: 'none', borderRadius: '0', boxShadow: 'none' },
    bubbleUser: { backgroundColor: '#0d9488', color: 'white', borderRadius: '12px', padding: '10px 16px' },
    bubbleVolunteer: { backgroundColor: '#f3f4f6', color: '#1f2937', borderRadius: '12px', padding: '10px 16px' },
    inputArea: { borderTop: '1px solid #f1f5f9', padding: '1.5rem 0' },
    input: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', backgroundColor: 'white' },
    sendButton: { backgroundColor: '#0f172a', borderRadius: '8px' }
  };

  return (
    <div style={styles.container}>
      <Header title={`Chat with ${volunteer.name}`} showHome />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
        
        {/* Chat Window */}
        <div style={{ 
          ...styles.chatWindow,
          display: 'flex', 
          flexDirection: 'column', 
          height: '600px',
          overflow: 'hidden'
        }}>
          
          {/* Messages Area */}
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} style={{ 
                  display: 'flex', 
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '0.5rem'
                }}>
                  {!isUser && (
                    <div style={{ 
                      width: '32px', height: '32px', 
                      backgroundColor: '#e0f2f1', borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      {volunteer.avatar || '👤'}
                    </div>
                  )}
                  
                  <div style={{ maxWidth: '70%' }}>
                    <div style={isUser ? styles.bubbleUser : styles.bubbleVolunteer}>
                      {msg.text}
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: '#9ca3af', 
                      marginTop: '4px', 
                      textAlign: isUser ? 'right' : 'left' 
                    }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                 <div style={{ 
                    width: '32px', height: '32px', 
                    backgroundColor: '#e0f2f1', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {volunteer.avatar || '👤'}
                  </div>
                  <div style={{ 
                    backgroundColor: '#f3f4f6', 
                    padding: '10px 16px', 
                    borderRadius: '12px',
                    color: '#6b7280',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    Typing...
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} style={styles.inputArea}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ flex: 1, outline: 'none', ...styles.input }}
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={isTyping}
                style={{ 
                  color: 'white', 
                  border: 'none', 
                  padding: '0 24px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'opacity 0.2s',
                  opacity: isTyping ? 0.7 : 1,
                  ...styles.sendButton
                }}
              >
                Send
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
