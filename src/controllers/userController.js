const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      registeredAt: Date.now()
    });

    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
};

// Authenticate user using HTTP Basic Auth
exports.authenticateUser = async (username, password, cb) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return cb(null, false); // User not found
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    
    if (!validPassword) {
      return cb(null, false); // Invalid password
    }

    return cb(null, true); // Authentication successful
  } catch (err) {
    return cb(err);
  }
};
