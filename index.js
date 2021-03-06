const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./user.js')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

        console.log('We have a new coonection');

        socket.on('join', ({name, room}, callback) => {

                
                const {error, user} = addUser({id : socket.id, name, room});
                if(error) return callback(error)

                socket.emit('message', {user : 'admin', text : `${user.name}, welcome to room ${user.room}`})
                socket.broadcast.to(user.room).emit('message', {user : 'admin', text : `${user.name} has joined`})

                socket.join(user.room)

                io.to(user.room).emit('roomData', {room : user.room, users : getUsersInRoom(user.room)})

                callback();
        })


        socket.on('sendMessage', (message, callback) => {

                const user = getUser(socket.id)
                io.to(user.room).emit('message', {user : user.name, text : message})

                callback();

        })

        socket.on('disconnect', () => {

                const user = removeUser(socket.id)

                if(user) {

                        io.to(user.room).emit('message', {user : 'admin', text : `${user.name} has left`})
                        io.to(user.room).emit('roomData', {room : user.room, users : getUsersInRoom(user.room)})
                        
                }

                
                
        })
})



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
