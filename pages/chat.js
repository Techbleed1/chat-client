// pages/chat.js
import { useState } from 'react';
import Chat from '../components/Chat';

export default function ChatPage() {
  const [roomId, setRoomId] = useState('room1'); // Default room ID

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Chat Application</h1>
      <label>
        Room ID:
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
      <Chat roomId={roomId} />
    </div>
  );
}
