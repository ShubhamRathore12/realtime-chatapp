import React, {useState, useEffect} from 'react'
import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import TextContainer from '../TextContainer/TextContainer';
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

let socket


function Chat({location}) {

        const [name, setName] = useState('')
        const [room, setRoom] = useState('')
        const [message, setMessage] = useState('')
        const [messages, setMessages] = useState([])
        const [users, setUsers] = useState([])
        const ENDPOINT = 'http://localhost:5000'

        useEffect(() => {

                const {name, room} = queryString.parse(location.search)
                setName(name)
                setRoom(room)

                socket = io(ENDPOINT, {transports : ["websocket"]})

                socket.emit('join', {name, room}, () => {

                })

                return () => {

                        socket.emit('disconnect')
                        socket.off()
                }
                

        }, [ENDPOINT, location.search])


        useEffect(() => {

                socket.on('message', (message) => {

                        setMessages([...messages, message])

                })

                socket.on('roomData', ({users}) => {

                        setUsers(users)

                })

        }, [messages])


        const sendMessage = (event) => {
                
                event.preventDefault()

                if(message) {

                        socket.emit('sendMessage', message, () => {

                                setMessage('')

                        })
                }
        }

     
        return (
                 <div className="outerContainer">
                         <div className="container">

                                <InfoBar room={room} />
                                <Messages messages={messages} name={name}/>
                                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                         </div>
                         <TextContainer users={users}/>
                 </div>
        )
}

export default Chat
