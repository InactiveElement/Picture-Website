const express = require('express');

const { body } = require('express-validator');

const router = express.Router()

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('email').isEmail().withMessage('Please enter a valid email address.')
        .custom(async (email) => {
            const user = await User.find(email);
            if (user[0].length > 0) {
                return Promise.reject('Email address already exists.')
            }
        })
        .normalizeEmail(),
        body('username').trim().not().isEmpty()
        .custom(async (username) => {
            const user = await User.find(username);
            if (user[0].length > 0) {
                return Promise.reject('Username already exists.')
            }
        }),
        body('password').trim().isLength({ min: 5})
    ], authController.signup
);

module.exports = router;