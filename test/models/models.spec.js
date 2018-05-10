const expect = require('chai').expect;
const db = require('../../server/db')
const { conn, Sequelize } = require('../../server/db/conn')
const { User } = db.models;
const jwt = require('jwt-simple');
const KEY = process.env.KEY
// const { KEY } = require('../../secret')

const seedUsers = () => {
  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        User.create({
          firstName: 'Jeremy',
          lastName: 'Philipson',
          isAdmin: true,
          username: 'jphilipson',
          password: 'JEREMY',
          email: 'jeremy@gmail.com'
        }),
        User.create({
          firstName: 'Jeremy',
          lastName: 'Grubard',
          isAdmin: true,
          username: 'jgrubard',
          password: 'JEREMY',
          email: 'jgrubard@gmail.com'
        }),
        User.create({
          firstName: 'Alice',
          lastName: 'Luong',
          isAdmin: true,
          username: 'aluong',
          password: 'ALICE',
          email: 'alice@gmail.com'
        }),
        User.create({
          firstName: 'Alex',
          lastName: 'Levin',
          isAdmin: true,
          username: 'alevin',
          password: 'ALEX',
          email: 'alex@gmail.com'
        }),
        User.create({
          firstName: 'John',
          lastName: 'Doe',
          isAdmin: false,
          username: 'jdoe',
          password: 'JOHN',
          email: 'john@gmail.com'
        }),
      ])
    })
}

let userMap;
describe('User Model', () => {
  beforeEach(() => {
    return seedUsers()
      .then( users => {
        userMap = users.reduce((memo, user) => {
          memo[user.username] = user;
          return memo;
        }, {})
      })
  })
  it('exists', () => {
    expect(User).to.be.ok;
  })
  it('there are 5 users', () => {
    expect(Object.keys(userMap).length).to.equal(5);
  })
  it('jeremy p exists', () => {
    const jp = userMap.jphilipson
    expect(jp.username).to.equal('jphilipson');
  })
  it('jeremy g exists', () => {
    const jg = userMap.jgrubard
    expect(jg.password).to.equal('JEREMY');
  })
})

describe('User.authenticate', () => {
  it('returns a token with correct creds', () => {
    const jeremy = userMap.jphilipson
    const _token = jwt.encode({ id: jeremy.id }, KEY)
    const creds = {
      username: jeremy.username,
      password: jeremy.password
    }
    return User.authenticate(creds)
      .then( token => expect(token).to.equal(_token))
  })
  it('throws an error with a 401 status incorrect creds', () => {
    const jeremy = userMap.jgrubard
    const creds = {
      username: jeremy.username,
      password: 'admin'
    }
    return User.authenticate(creds)
      .catch( ex => expect(ex.status).to.equal(401))
  })
})

describe('User.exchangeTokenForUser', () => {
  it('returns a user with valid token', () => {
    const jeremy = userMap.jphilipson
    const _token = jwt.encode({ id: jeremy.id }, KEY)
    const creds = {
      username: jeremy.username,
      password: jeremy.password
    }
    return User.authenticate(creds)
      .then( token => User.exchangeTokenForUser(token))
      .then( user => expect(user.username).to.equal(jeremy.username))
  })
  it('throws an error with an invalid token', () => {
    const jeremyp = userMap.jphilipson
    const _token = jwt.encode({ id: jeremyp.id }, 'bazz')
    return User.exchangeTokenForUser(_token)
      .catch(ex => expect(ex.status).to.equal(401))
  })
  it('throws an error with a good token, no user', () => {
    const _token = jwt.encode({ id: 99 }, KEY)
    return User.exchangeTokenForUser(_token)
      .then(() => {
        throw 'no user'
      })
      .catch(ex => expect(ex.status).to.equal(401))
  })
})
