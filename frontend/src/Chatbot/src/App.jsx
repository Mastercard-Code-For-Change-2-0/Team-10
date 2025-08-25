import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text };
    const botMessage = {
      sender: 'bot',
      text: `You said: "${text}" 🤖`,
    };
    setMessages((prev) => [...prev,userMessage]);
   setTimeout(() => {
      setMessages((prev) => [...prev,botMessage]);
    }, 500);
  };

  return (
    <div className="app-container">
      <ChatWindow messages={messages} onSend={handleSend} />
    </div>
  );
}

export default App;
