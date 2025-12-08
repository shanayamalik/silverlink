import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';

export default function ChatPage() {
  const { volunteerId } = useParams();
  const location = useLocation();
  const [inputMessage, setInputMessage] = useState('');
  
  // Mock Volunteer Data (fallback if not passed in state)
  const volunteer = location.state?.volunteer || {
    id: volunteerId || 1,
    name: 'Sarah Jenkins',
    avatar: '👩‍🏫',
    role: 'Reading Companion'
  };

  // Mock Chat History
  const [messages, setMessages] = useState([
    { id: 1, sender: 'volunteer', text: `Hi there! I saw you're interested in reading together. I'd love to help!`, time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Hello Sarah! Yes, I have a few books I need help with.', time: '10:32 AM' },
    { id: 3, sender: 'volunteer', text: 'That sounds wonderful. What kind of books do you enjoy?', time: '10:33 AM' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
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
      <Header title={`Chat with ${volunteer.name}`} showBack />

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
                      {volunteer.avatar}
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
              />
              <button 
                type="submit"
                style={{ 
                  color: 'white', 
                  border: 'none', 
                  padding: '0 24px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'opacity 0.2s',
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
