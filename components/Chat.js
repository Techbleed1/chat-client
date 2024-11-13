// components/Chat.js
import { useState } from 'react';
import { useChat } from '../hooks/useChat';

export default function Chat({ roomId }) {
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Chat Room: {roomId}</h2>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.senderId}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '0.5rem' }}>
        Send
      </button>
    </div>
  );
}
