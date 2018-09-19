const expect = require('expect');
const mocha = require('mocha');

const {generateMessage} = require('./message');

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
