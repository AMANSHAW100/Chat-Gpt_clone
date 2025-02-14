import React, { useState } from 'react';
import './ChatPanel.css';

const ChatPanel = () => {
  // Example list of conversations (you can replace this with actual data from an API or state)
  const initialChats = [
    { id: 1, title: 'Conversation 1' },
    { id: 2, title: 'Conversation 2' },
    { id: 3, title: 'Conversation 3' },
  ];

  const [chats, setChats] = useState(initialChats);
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingChat, setEditingChat] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle edit button click
  const handleEditClick = (chat) => {
    setEditing(true);
    setEditingChat(chat);
    setNewTitle(chat.title);
  };

  // Handle saving the new title
  const handleSaveEdit = () => {
    const updatedChats = chats.map((chat) =>
      chat.id === editingChat.id ? { ...chat, title: newTitle } : chat
    );
    setChats(updatedChats);
    setEditing(false);
    setEditingChat(null);
    setNewTitle('');
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditing(false);
    setEditingChat(null);
    setNewTitle('');
  };

  return (
    <div className="chat-panel">
      <h3>Chats</h3>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* List of conversations */}
      <ul className="chat-history">
        {filteredChats.map((chat) => (
          <li key={chat.id} className="chat-item">
            {/* Display the title or editing input */}
            {editing && editingChat.id === chat.id ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <span>{chat.title}</span>
            )}
            {/* Edit button */}
            {!editing || editingChat.id !== chat.id ? (
              <button onClick={() => handleEditClick(chat)}>Edit</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPanel;
