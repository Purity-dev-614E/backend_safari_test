const db = require('../db'); // Your DB connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = {
    // Create new user
    create: async (email, username, password, role = 'user',) => {
        const hashedPassword = await bcrypt.hash(password, 10);// Hash the password
        console.log("Hashed Password: ", hashedPassword);
        try {
            return await db.none(
                'INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4)',
                [email,username, hashedPassword, role]
            );
        } catch (error) {
            console.error('Database Error:', error)
            throw new Error(error.message);
        }
    },

    // Get user by email
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
    },


    // Update user profile
    async updateById(userId, data) {
        const { full_name, gender, location, next_of_kin, next_of_kin_number } = data;
    
        const result = await db.oneOrNone(`
                UPDATE users 
                SET full_name = $1, gender = $2, location = $3, 
                next_of_kin = $4, next_of_kin_number = $5
                WHERE id = $6
                RETURNING *`,
                [full_name, gender, location, next_of_kin, next_of_kin_number, userId]
            );
    
            return result;
        },

    // Get user by ID
    async getById(userId) {
        try{
            return await db.oneOrNone('SELECT * FROM users WHERE id = $1', [userId]);
        } catch (error) {
            throw new Error('Error fetching user');
        }
    },
    
    //get all users
    async getAll() {
        return await db.manyOrNone('SELECT * FROM users');
    },
};

    

module.exports = User;
