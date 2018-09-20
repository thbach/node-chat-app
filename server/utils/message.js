const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date().getTime(),
});

const generateLocationMessage = (from, lat, long) => ({
  from,
  url: `https://www.google.com/maps?q=${lat},${long}`,
  createdAt: new Date().getTime(),
});

module.exports = {generateMessage, generateLocationMessage};
