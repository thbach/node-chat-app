const socket = io();

socket.on('connect', () => {
  console.log('Connected to Server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('newMessage', message => {
  const li = document.createElement('li');
  const textNode = document.createTextNode(`${message.from}: ${message.text}`);
  li.appendChild(textNode);
  document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', message => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.target = '_blank';
  a.href = message.url;
  a.text = 'My Current Location';
  li.appendChild(document.createTextNode(`${message.from}: `));
  li.appendChild(a);
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

const locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    },
    () => {
      alert('Unable to fetch location.');
    }
  );
});
