const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new userbut we use JWT
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

// Authenticate user and generate jwt token for that
exports.loginUser = async (req, res) => {

  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send('Invalid username or password');

    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    
    if (!validPassword) {
      return res.status(400).send('Invalid username or password');

    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ token: token });

  } catch (err) {
    res.status(500).send('Error logging in user');
    
  }
};
