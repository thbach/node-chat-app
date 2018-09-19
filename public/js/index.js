const socket = io();

socket.on('connect', () => {
  console.log('Connected to Server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
  const li = document.createElement('li');
  const textNode = document.createTextNode(`${message.from}: ${message.text}`);
  li.appendChild(textNode);
  document.getElementById('messages').appendChild(li);
});

const form = document.getElementById('message-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('message').value;
  socket.emit('createMessage', {from: 'tbach', text: msg}, data => {
    console.log('Got it', data);
  });
});
