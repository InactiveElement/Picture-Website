const db = require('../util/database');

module.exports = class User {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;

        this.password = password;
    }

    static find(email) {
        return db.execute(
            'SELECT * FROM user WHERE user_email = ?', [email]);
    }

    static find(username) {
        return db.execute(
            'SELECT * FROM user WHERE user_username = ?', [username]);
    }

    static save(user) {
        return db.execute(
            'INSERT INTO user (user_email, user_username, user_password) VALUES (?, ?, ?)',
            [user.email, user.username, user.password]
        )
    }
};
