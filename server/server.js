const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");

const {generateMessage} = require('./utils/message.js');

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

  socket.emit('newMessage', generateMessage('ADMIN', 'Welcome to chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('ADMIN', 'New User joined!'));

  socket.on('createMessage', (data) => {
    console.log('Message created', data);
    io.emit('newMessage', generateMessage(data.from, data.text));
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
