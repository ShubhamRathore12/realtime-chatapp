import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './Input.css'

function Input({message, setMessage, sendMessage}) {
        return (
                
                <form className="form">
                        <input  type="text" className="input" 
                                placeholder="Type a message..." 
                                value={message} 
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event):null}>
                        </input>
                        <button className="sendButton" onClick={(event) => sendMessage(event)}><FontAwesomeIcon icon={faPaperPlane} size="2x" /></button>
                </form>
        )
}

export default Input
