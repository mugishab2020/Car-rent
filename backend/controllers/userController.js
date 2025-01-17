const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

exports.registerUser = async (req, res) => {
  try {
    const { username, name, email, phone , password } = req.body;
    if (!username ||!name ||!email ||!phone ||!password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const isregistered = await User.findOne({ email: email});
    if (isregistered) {
      console.log('User already registered');
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('The hashed password before storing:', hashedPassword);

    const user = new User({ username, name, email, phone, password: hashedPassword });
    console.log('User instance before saving:', user);

    await user.save();
    console.log('User saved successfully:', user);

    const saveduser = await user.save();
    console.log(saveduser);
    res.status(201).json({ message: 'User registered successfully' , user: saveduser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt', username, password);

    const user = await User.findOne({ username });
    console.log("user found is: ", user)
    if (!user){
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const userId = user._id;
    res.status(200).json({ message: "Logged in successfully ",username, userId, token });
    console.log("User logged in successfully", username, userId, token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
