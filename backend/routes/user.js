const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require("dotenv").config();
const router = express.Router();
const secretKey = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const user1 = await User.findOne({ where: { username } });
  if(user1){
    //console.log(user1);
    return res.status(400).json({ msg: 'User Already Existed' });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await User.create({ username, password: hashedPassword, role });
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id, role: user.role }, secretKey);
  res.json({ token });
});

module.exports = router;
