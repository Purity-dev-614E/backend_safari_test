const User = require('../models/usermodel');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');


// Fetch all users
router.get('/', auth.authenticateToken, async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});


module.exports = router;
