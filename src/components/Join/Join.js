import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

function Join() {

        const [name, setName] = useState('')
        const [room , setRoom] = useState('')

        return (
                <div className="joinOuterContainer">
                        <div className="joinInnerContainer">
                                <h1 className="heading"></h1>
                                <div><input type="text" className="joinInput" placeholder="Enter name" onChange={(event) => setName(event.target.value)}></input></div>
                                <div><input type="text" className="joinInput mt-20" placeholder="Enter room"  onChange={(event) => setRoom(event.target.value)}></input></div>
                                <Link onClick={event => (!name || !room)? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                                        <button type="submit" className="button mt-20">Sign In</button>
                                </Link>
                        </div>

                </div>
        )
}

export default Join
