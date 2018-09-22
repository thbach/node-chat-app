const expect = require('expect');
const mocha = require('mocha');

const {Users} = require('./users');

mocha.describe('Users', () => {
  let users;

  mocha.beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'thai',
        room: 'node course',
      },
      {
        id: '2',
        name: 'emily',
        room: 'react course',
      },
      {
        id: '3',
        name: 'evan',
        room: 'node course',
      },
    ];
  });

  mocha.it('should add new user', () => {
    const users1 = new Users();
    const user = {
      id: '123',
      name: 'thai',
      room: 'choc top',
    };
    const resUser = users1.addUser(user.id, user.name, user.room);

    expect(users1.users).toEqual([user]);
    expect(resUser.name).toEqual(user.name);
  });

  mocha.it('should return user from node course', () => {
    const userList = users.getUserList('node course');
    expect(userList).toEqual(['thai', 'evan']);
  });

  mocha.it('should return user from react course', () => {
    const userList = users.getUserList('react course');
    expect(userList).toEqual(['emily']);
  });

  mocha.it('should remove a user', () => {
    const userToBeRemoved = users.users[0];
    const user = users.removeUser('1');
    expect(user).toEqual(userToBeRemoved);
    expect(users.users.length).toBe(2);
  });

  mocha.it('should not remove a user', () => {
    users.removeUser('5');
    expect(users.users.length).toBe(3);
  });

  mocha.it('should find user', () => {
    const user = users.getUser('2');
    expect(user).toEqual(users.users[1]);
  });

  mocha.it('should not find user', () => {
    const user = users.getUser('5');
    expect(user).toBeFalsy();
  });
});
