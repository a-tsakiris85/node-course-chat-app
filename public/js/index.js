var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  socket.emit('createMessage', {
    from: 'andrew@example.com',
    text: 'I just connected!'
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//custom events
socket.on('newEmail', function (data) {
  console.log("New Email:", data);
});

socket.on('newMessage', function(data) {
  console.log('Got new Message:', data);
});
