const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            email: email,
            username: username,
            password: hashedPassword
        }

        const result = await User.save(userDetails);

        res.status(201).json({ message: 'User signed up.' })
    } catch (err) {
        if (!err.stausCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}