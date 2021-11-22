const express = require('express');

const { body } = require('express-validator');

const router = express.Router()

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/checkUser', authController.checkUser);

module.exports = router;