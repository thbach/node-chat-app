const socket = io();

socket.on('connect', () => {
  console.log('Connected to Server');

  socket.emit('createMessageEvent', {
    from: 'John',
    text: 'Hi Im john',
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('newMessage', newMessage => {
  console.log('newMessage', newMessage);
});
