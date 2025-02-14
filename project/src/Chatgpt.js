import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Chatgpt = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Update messages array with user input
    setMessages([...messages, { role: 'user', content: userInput }]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo', // Or whichever model you prefer
          messages: [...messages, { role: 'user', content: userInput }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages([
        ...messages,
        { role: 'user', content: userInput },
        { role: 'assistant', content: botMessage },
      ]);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    }

    setLoading(false);
  };

  return (
    <div className="chat-area">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === 'user' ? 'user-message' : 'bot-message'}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatgpt;
