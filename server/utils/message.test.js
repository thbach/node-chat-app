const expect = require('expect');
const mocha = require('mocha');

const {generateMessage, generateLocationMessage} = require('./message');

mocha.describe('generateMessage', () => {
  mocha.it('should generate the correct message object', () => {
    const from = 'tbach';
    const text = 'hello whats up';
    const res = generateMessage(from, text);
    expect(res).toMatchObject({from, text});
    expect(res).toHaveProperty('from', from);
    expect(typeof res.createdAt).toBe('number');
  });
});

mocha.describe('generateLocationMessage', () => {
  mocha.it('should generate correct location object', () => {
    const from = 'tbach';
    const res = generateLocationMessage(from, 50, 100);
    expect(res).toHaveProperty('from', from);
    expect(typeof res.createdAt).toBe('number');
    expect(res.url).toBe(`https://www.google.com/maps?q=50,100`);
  });
});
