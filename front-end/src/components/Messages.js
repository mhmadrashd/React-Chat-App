import React, { useEffect } from 'react'
import Message from './Message';

function Messages(props) {
    useEffect(() => {
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }, []);

    const messages = props.messages.map((message, i) => {
        return (
            <Message
                key={i}
                username={message.username}
                message={message.message}
                fromMe={message.fromMe} />
        );
    });

    return (
        <div
            className='messages'
            id='messageList'>
            {messages}
        </div>
    );
}

export default Messages