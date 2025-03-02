const express = require('express');
const router = express.Router();
const User = require ('../models/usermodel')
const { register, login, refreshToken } = require('../controllers/authcontroller');

// POST /auth/refresh-token - Refresh JWT token
router.post('/refresh-token', refreshToken);

// POST /auth/register - Register a new user
router.post('/register',register, async (req, res) => {
    const { email ,username, password, role } = req.body;

    // Debugging log
    console.log('Request Body:', req.body);

    // Validate inputs
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Default to 'user' if role is not provided
    const roleMapping = { 'super admin': 'super admin', 'admin': 'admin', 'user': 'user' };
    const userRole = roleMapping[role] || 'user';

    try {
        await User.create(email, username, password, userRole);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});


// POST /auth/login - Log in and get JWT token
// Login user
router.post('/login',login, async (req, res) => {
    const { email, password} = req.body;

    // Check if username and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Step 1: Find user by Email
        const user = await User.getByEmail(email);
        console.log('User:', user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        // Step 2: Validate password
        const isMatch = await User.validatePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const profileIncomplete = !user.full_name || !user.display_photo || 
                                  !user.gender || !user.location || 
                                  !user.next_of_kin || !user.next_of_kin_number;


        // Step 3: Generate JWT Token
        const token = User.generateToken(user);

        // Step 4: Send response with token
        res.json({ message: 'Login successful', 
            // token, 
            role: user.role,
            profileIncomplete
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

module.exports = router;
