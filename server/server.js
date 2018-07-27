const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

  socket.emit('newMessage', {
    from: 'ADMIN',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
    from: 'ADMIN',
    text: 'A new user joined the app!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (data) => {
    console.log('Message created', data);
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    });
    //broadcasting emits to all but socket
    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // });
  });

});

server.listen(port, () => {
  console.log('Server is up on port', port);
});
