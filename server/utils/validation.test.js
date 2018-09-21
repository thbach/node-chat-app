const expect = require('expect');
const mocha = require('mocha');

const {isRealString} = require('./validation');

mocha.describe('isRealString', () => {
  mocha.it('Should reject non string values', () => {
    const res = isRealString(235435);
    expect(res).toBeFalsy();
  });

  mocha.it('Should reject strings with only spaces', () => {
    const res = isRealString('    ');
    expect(res).toBeFalsy();
  });

  mocha.it('Should accept string with non space characters', () => {
    const res = isRealString('  The    Man   ');
    expect(res).toBeTruthy();
  });
});
