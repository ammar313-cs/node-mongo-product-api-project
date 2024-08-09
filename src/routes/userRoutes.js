const express = require('express');
const { registerUser } = require('../controllers/userController');
const { authenticateUser } = require('../controllers/userController');

// const { registerUser } = require('../controllers/userJwtController');


const router = express.Router();

// Register user route
router.post('/register', registerUser);

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
  
// Login user route for userjwtcontrollr.js
// router.post('/login', loginUser);

module.exports = router;
