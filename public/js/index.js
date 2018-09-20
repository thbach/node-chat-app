const socket = io();

const messageHtmlTemplate = `
<li class="message">
  <div class="message__title">
    <h4>{{from}}</h4>
    <span>{{createdAt}}</span>
  </div>
  <div class="message__body"><p>{{text}}</p></div>
</li>`;

const locationHtmlTemplate = `
<li class="message">
  <div class="message__title">
    <h4>{{from}}</h4>
    <span>{{createdAt}}</span>
  </div>
  <div class="message__body">
    <p>
      <a target="_blank" href="{{url}}">My current location</a>
    </p>
  </div>
</li>`;

socket.on('connect', () => {
  console.log('Connected to Server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Server');
});

socket.on('newMessage', message => {
  const template = Handlebars.compile(messageHtmlTemplate);
  const formattedTime = moment(message.createAt).format('h:mm a');
  const data = template({
    from: message.from,
    createdAt: formattedTime,
    text: message.text,
  });

  document.getElementById('messages').innerHTML += data;
});

socket.on('newLocationMessage', message => {
  const template = Handlebars.compile(locationHtmlTemplate);
  const formattedTime = moment(message.createAt).format('h:mm a');
  const data = template({
    from: message.from,
    createdAt: formattedTime,
    url: message.url,
  });

  document.getElementById('messages').innerHTML += data;
});

const form = document.getElementById('message-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const textbox = document.getElementById('message');
  socket.emit('createMessage', {from: 'tbach', text: textbox.value}, data => {
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
