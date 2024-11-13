// hooks/useChat.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3001'; // Replace with your server URL

export function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const socketInstance = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    setSocket(socketInstance);

    // Listen for incoming messages
    socketInstance.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on disconnection
    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  // Function to send a message
  const sendMessage = (messageText) => {
    if (socket) {
      const message = {
        roomId,
        text: messageText,
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      socket.emit('message', message); // Send the message to the server
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return { messages, sendMessage };
}
