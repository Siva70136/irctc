const jwt = require('jsonwebtoken');
const { User } = require('../models');
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const adminApiKey = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

function authorizeAdmin(req, res, next) {
  const apiKey = req.header('token');
 /* if (apiKey != adminApiKey) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  console.log("adimin check");*/
  next();
}

module.exports = {
  authenticate,
  authorizeAdmin
};
