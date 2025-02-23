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
    },


    // // Update user profile
    // updateProfile: async (userId, safari_group, gender, location, nk, contact_nk, profile_picture) => {
    //     try {
    //         await db.none(
    //             `UPDATE users 
    //              SET safari_group = $1, gender = $2, location = $3, nk = $4, contact_nk = $5, profile_picture = $6 
    //              WHERE id = $7`,
    //             [safari_group, gender, location, nk, contact_nk, profile_picture, userId]
    //         );
    //     } catch (error) {
    //         console.error('Profile Update Error:', error);
    //         throw new Error('Error updating profile');
    //     }
    // },

    // // Check if profile is complete
    // isProfileComplete: async (userId) => {
    //     try {
    //         const user = await db.one('SELECT * FROM users WHERE id = $1', [userId]);
    //         return user.safari_group && user.gender && user.location && user.nk && user.contact_nk;
    //     } catch (error) {
    //         console.error('Profile Check Error:', error);
    //         throw new Error('Error checking profile completeness');
    //     }
    // }
};

module.exports = User;
