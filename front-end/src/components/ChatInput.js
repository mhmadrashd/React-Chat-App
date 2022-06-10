import React, { useState } from 'react'

function ChatInput(props) {
    const [chatInput, setChatInput] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        setChatInput('');
        props.onSend(chatInput);
    }

    const textChangeHandler = (event) => {
        setChatInput(event.target.value);
    }
    return (
        <form className="chat-input" onSubmit={submitHandler}>
            <input type="text"
                onChange={textChangeHandler}
                value={chatInput}
                placeholder="Write a message..."
                required />
        </form>
    )
}

export default ChatInput