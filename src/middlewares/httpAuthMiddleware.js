const express = require('express');
const bodyParser = require('body-parser'); 
const basicAuth = require('express-basic-auth');
const { authenticateUser } = require('../controllers/userController');

const app = express();

app.use(bodyParser.json());


const myAuthorizer = async (username, password, cb) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {

      console.log('User not found in middleware');

      return cb(null, false); // User not found
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);

    return cb(null, validPassword); // Authenticate based on password match
  } catch (err) {
    console.error('Error during authentication:', err);
    return cb(null, false);
  }
};


const httpAuthMiddleware = basicAuth({
  authorizer: myAuthorizer,
  authorizeAsync: true,
  challenge: true,
  unauthorizedResponse: (req) => 'Unauthorized',
});

module.exports = httpAuthMiddleware;