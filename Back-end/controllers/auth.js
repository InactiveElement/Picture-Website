const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    const userU = await User.findU(username)
    if(userU[0].length > 0) {
      const error = new Error("Username already in use.")
      error.statusCode = 403;
      res.status(409).json({ message: error.message });
      throw error;
    }
    const userE = await User.findE(email)
    if(userE[0].length > 0) {
      const error = new Error("Email address already in use.")
      error.statusCode = 403;
      res.status(409).json({ message: error.message });
      throw error;
    }
    const result = await User.save(userDetails);

    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.checkUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const userU = await User.findU(username)
    if(userU[0].length > 0) {
      res.status(201).json({ message: "Success" });
    } else {
      const error = new Error("Username does not exist.")
      error.statusCode = 412;
      res.status(412).json({ message: error.message });
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findE(email)

    if(user[0].length !== 1) {
      const error = new Error('Email address not found.')
      error.statusCode = 401;
      res.status(401).json({ message: error.message });
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Password incorrect.')
      error.statusCode = 401;
      res.status(401).json({ message: error.message });
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id, username: storedUser.username });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
