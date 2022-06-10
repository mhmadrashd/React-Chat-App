import React, { useEffect, useState } from 'react'

import io from 'socket.io-client';

import Messages from './Messages';
import ChatInput from './ChatInput';
require('../styles/ChatApp.css');

const api = 'http://localhost:3000'

const socket = io(api, { query: `||Anonymous=${sessionStorage.getItem('username') || 'Anonymous'}` }).connect();
function ChatApp() {
    const [messages, setMessages] = useState([]);

    socket.on('server:message', message => {
        addMessage(message);
    });
    const sendHandler = (message) => {
        const messageObject = {
            username: sessionStorage.getItem('username') || 'Anonymous',
            message
        };

        // Emit the message to the server
        socket.emit('client:message', messageObject);

        messageObject.fromMe = true;
        addMessage(messageObject);
    }

    const addMessage = (message) => {
        // Append the message to the component state
        const mmessages = new Array(...messages);
        mmessages.push(message);

        setMessages(mmessages);
    }

    return (
        <div className="container">
            <h3>React Chat App Task ITI</h3>
            <Messages messages={messages} />
            <ChatInput onSend={sendHandler} />
        </div>
    )
}

export default ChatApp