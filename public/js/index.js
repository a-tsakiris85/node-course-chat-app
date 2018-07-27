var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('Got new Message:', data);

  var li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  jQuery('#messages').append(li);

});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'hi'
// }, function(message) {
//   console.log('Got: ', message);
// });

//handles the submit event
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
})
