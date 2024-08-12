const chai = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = require('../src/index'); 
const User = require('../src/models/User'); 

const { expect } = chai;
const request = supertest(app);

describe('User Controller', function () {

  before(function (done) {
    this.timeout(30000);
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        done(); 
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        done(err); 
      });
  });

  after(function (done) {
    this.timeout(30000); 
    mongoose.connection.close()
      .then(() => {
        console.log("MongoDB connection closed");
        done(); 
      })
      .catch((err) => {
        console.error("Error closing MongoDB connection:", err);
        done(err); 
      });
  });

  beforeEach(function (done) {
    this.timeout(30000); // Set timeout for clearing the collection
    User.deleteMany({})
      .then(() => {
        done(); 
      })
      .catch((err) => {
        console.error("Error in User.deleteMany:", err);
        done(err); 
      });
  });

  describe('POST /api/users/register', function () {
    it('should register a new user', function (done) {
      const user = { username: 'testuser', password: 'password123' };
      request
        .post('/api/users/register')
        .send(user)
        .expect(201) 
        .then((res) => {
          expect(res.text).to.equal('User created');
          return User.findOne({ username: 'testuser' });
        })
        .then((foundUser) => {
          expect(foundUser).to.not.be.null;
          expect(bcrypt.compareSync('password123', foundUser.password)).to.be.true; // Ensure password is hashed correctly
          done(); //
        })
        .catch(done); 
    });

    it('should not register a user with a duplicate username', function (done) {
      const user = { username: 'testuser1', password: 'password1231' };
      new User(user).save()
        .then(() => {
          return request
            .post('/api/users/register')
            .send(user)
            .expect(500); // Expect a 500 Internal Server Error due to duplicate username
        })
        .then((res) => {
          expect(res.text).to.equal('Error creating user');
          done(); //
        })
        .catch(done); 
    });
  });

  describe('POST /api/users/login', function () {
    it('should authenticate a user with correct credentials', function (done) {
      const user = { username: 'testuser1', password: 'password1231' };
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      new User({ username: user.username, password: hashedPassword }).save()
        .then(() => {
          request
            .post('/api/users/login')
            .send({ username: user.username, password: user.password }) // Send JSON payload
            .expect(200) // Expect a 200 OK status
            .then((res) => {
              expect(res.text).to.equal('Authentication successful');
              done(); //
            })
            .catch(done); 
        });
    });

    it('should not authenticate a user with incorrect credentials', function (done) {
      const user = { username: 'testuser1', password: 'password1231' };
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      new User({ username: user.username, password: hashedPassword }).save()
        .then(() => {
          request
            .post('/api/users/login')
            .send({ username: user.username, password: 'wrongpassword' }) // Send incorrect password
            .expect(401) 
            .then((res) => {
              expect(res.text).to.equal('Authentication failed');
              done(); //
            })
            .catch(done); 
        });
    });

    it('should return 404 if the user does not exist', function (done) {
      request
        .post('/api/users/login')
        .send({ username: 'nonexistentuser', password: 'password123' }) // Send non-existent username
        .expect(404) // Expect a 404 Not Found status
        .then((res) => {
          expect(res.text).to.equal('User not found');
          done(); //
        })
        .catch(done); 
    });
  });
});
