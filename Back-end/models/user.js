const db = require('../util/database');

// const wrappingFunction = async () => {
//     const connection = await db.getConnection();
//     console.log(connection);
// };
// wrappingFunction();

module.exports = class User {
    constructor(username, email, password) {
        
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static findU(username) {
        return db.execute(
            'SELECT * FROM users WHERE username = ?', [username]);
    }

    static findE(email) {
        return db.execute(
            'SELECT * FROM users WHERE email = ?', [email]);
    }

    static save(user) {
        return db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
         [user.username, user.email, user.password]
        );
    }
};
