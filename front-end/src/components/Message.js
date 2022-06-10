import React from 'react'

function Message(props) {


    const fromMe = props.fromMe || false ? 'from-me' : '';
    return (
        <div className={`message ${fromMe}`}>
            <div className='username'>
                {props.username || ''}
            </div>
            <div className='message-body'>
                {props.message || ''}
            </div>
        </div>
    )
}

export default Message