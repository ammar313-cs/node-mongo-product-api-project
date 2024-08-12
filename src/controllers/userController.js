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
  } 
  catch (err) {
    res.status(500).send('Error creating user');
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send('Authentication failed');
    }

    return res.status(200).send('Authentication successful');
  } catch (err) {
    console.error('Internal server error:', err);
    return res.status(500).send('Internal server error');
  }
};
