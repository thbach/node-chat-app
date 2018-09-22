const socket = io();

const scrollToBottom = function scrollToBottom() {
  // Selectors
  const messages = document.getElementById('messages');
  const newMessage = messages.lastElementChild;
  const lastMessageHeight =
    newMessage.previousElementSibling != null ? newMessage.previousElementSibling.clientHeight : 0;

  // Heights
  const {clientHeight} = messages;
  const {scrollTop} = messages;
  const {scrollHeight} = messages;

  if (clientHeight + scrollTop + newMessage.clientHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
};

socket.on('connect', () => {
  const params = deparam(window.location.search.substr(1));

  socket.emit('join', params, err => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('updateUserList', users => {
  const template = Handlebars.compile(document.getElementById('users-template').innerHTML);
  document.getElementById('usersList').innerHTML = '';
  users.forEach(user => {
    document.getElementById('usersList').innerHTML += template({user});
  });
});

socket.on('newMessage', message => {
  const template = Handlebars.compile(document.getElementById('message-template').innerHTML);
  const formattedTime = moment(message.createAt).format('h:mm a');
  const data = template({
    from: message.from,
    createdAt: formattedTime,
    text: message.text,
  });

  document.getElementById('messages').innerHTML += data;
  scrollToBottom();
});

socket.on('newLocationMessage', message => {
  const template = Handlebars.compile(document.getElementById('location-message-template').innerHTML);
  const formattedTime = moment(message.createAt).format('h:mm a');
  const data = template({
    from: message.from,
    createdAt: formattedTime,
    url: message.url,
  });

  document.getElementById('messages').innerHTML += data;
  scrollToBottom();
});

const form = document.getElementById('message-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const textbox = document.getElementById('message');
  socket.emit('createMessage', {text: textbox.value}, data => {
    console.log('Got it', data);
  });
  textbox.value = '';
});

const locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.disabled = 'disabled';

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.disabled = '';
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    },
    () => {
      locationButton.disabled = '';
      alert('Unable to fetch location.');
    }
  );
});
