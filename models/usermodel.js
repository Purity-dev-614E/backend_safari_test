const db = require('../db'); // Your DB connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = {
    // Create new user
    create: async (username,password, role = 'user', email) => {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        try {
            return await db.none(
                'INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4)',
                [email,username, hashedPassword, role]
            );
        } catch (error) {
            throw new Error('Error creating user');
        }
    },

    // Get user by username
    getByEmail: async (email) => {
        try {
            return await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        } catch (error) {
            throw new Error('Error fetching user');
        }
    },

    // Validate password
    validatePassword: async (plainPassword, hashedPassword) => {
        return bcrypt.compare(plainPassword, hashedPassword);
    },

    // Generate JWT token
    generateToken: (user) => {
        const payload = { id: user.id, email: user.email,username: user.username, role: user.role };
        return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // JWT expiration time of 1 hour
    }
};

module.exports = User;
