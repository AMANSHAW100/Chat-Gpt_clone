import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import './'
import ChatGPT from './Chatgpt';
import ChatPanel from './ChatPanel';
function App() {
  const [input,SetInput]=useState("")
  return (
    <div className="app">
      
      {/* <div class="sidebar">
        <h2> ChatGpt</h2>
        <div class="value">
        <button onclick="newchat()"> New Chat</button>
        <button> History</button>
        <button> Settings</button>
        <button> Help</button>
        </div>
      </div>

      <div class="chat-container">
        <div class="chatgpt">
          <div class="input-box">
            
            <input 
             type="text"
             className="input-box"
             placeholder="Type a message"
             value={input}
            //  onChange={}
            />
            <button onclick="sendmessage()"> Send </button>
          </div>
        </div>
      </div> */}
      <ChatPanel/>
      <ChatGPT/>
    </div>
  );
}

export default App;
