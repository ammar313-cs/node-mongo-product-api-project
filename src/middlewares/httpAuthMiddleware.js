const express = require('express');
const basicAuth = require('express-basic-auth');
const { authenticateUser } = require('../controllers/userController');

const app = express();

const myAuthorizer = async (username, password, cb) => {
  const isAuthorized = await authenticateUser(username, password);
  return cb(null, isAuthorized);

};

const httpAuthMiddleware = basicAuth({
  authorizer: myAuthorizer,
  authorizeAsync: true,
  challenge: true,
  unauthorizedResponse: (req) => 'Unauthorized',
  
});

module.exports = httpAuthMiddleware;
