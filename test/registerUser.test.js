const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const User = require('../src/models/User');
const should = chai.should();

chai.use(chaiHttp);

describe('User Registration', () => {
  beforeEach((done) => { 
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('/POST register', () => {
    it('it should register a new user', (done) => {
      let user = {
        username: "testuser",
        password: "testpassword"
      };
      chai.request(server)
        .post('/api/users/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.text.should.equal('User created');
          done();
        });
    });

    it('it should not register a user with an existing username', (done) => {
      let user = new User({
        username: "testuser",
        password: "testpassword",
        registeredAt: Date.now()
      });
      user.save((err, user) => {
        chai.request(server)
          .post('/api/users/register')
          .send({ username: "testuser", password: "testpassword" })
          .end((err, res) => {
            res.should.have.status(500);
            res.text.should.equal('Error creating user');
            done();
          });
      });
    });
  });
});
