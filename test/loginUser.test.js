const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');
const should = chai.should();

chai.use(chaiHttp);

describe('User Login', () => {
  beforeEach((done) => { 
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('/POST login', () => {
    it('it should login a user and return a token', (done) => {
      let user = new User({
        username: "testuser",
        password: bcrypt.hashSync("testpassword", 10),
        registeredAt: Date.now()
      });
      user.save((err, user) => {
        chai.request(server)
          .post('/api/users/login')
          .send({ username: "testuser", password: "testpassword" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            done();
          });
      });
    });

    it('it should not login a user with invalid password', (done) => {
      let user = new User({
        username: "testuser",
        password: bcrypt.hashSync("testpassword", 10),
        registeredAt: Date.now()
      });
      user.save((err, user) => {
        chai.request(server)
          .post('/api/users/login')
          .send({ username: "testuser", password: "wrongpassword" })
          .end((err, res) => {
            res.should.have.status(400);
            res.text.should.equal('Invalid username or password');
            done();
          });
      });
    });

    it('it should not login a user with invalid username', (done) => {
      chai.request(server)
        .post('/api/users/login')
        .send({ username: "wronguser", password: "testpassword" })
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.equal('Invalid username or password');
          done();
        });
    });
  });
});
