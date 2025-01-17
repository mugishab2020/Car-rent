const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const userrouter = express.Router();

userrouter.post('/register', registerUser);
userrouter.post('/login', loginUser);

module.exports = userrouter;
