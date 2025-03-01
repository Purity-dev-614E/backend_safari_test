const User = require('../models/usermodel');
const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controllers/authcontroller');
const auth = require('../middleware/authmiddleware');


//fetch user profile
router.get('/profile', auth.authenticateToken, async (req, res) => {
    try {
        const user = await User.getById(req.user.id
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
}
);

//update user profile
router.put('/profile', auth.authenticateToken, async (req, res) => {
    try {
        const user = await User.updateById(req.user.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
}
);