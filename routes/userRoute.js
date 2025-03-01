const User = require('../models/usermodel');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');


// Fetch user profile
router.get('/user/:id', auth.authenticateToken, async (req, res) => {
    try {
        const user = await User.getById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
}); 

// Update user profile
router.put('/user/:id', auth.authenticateToken, async (req, res) => {
    try {
        const user = await User.updateById(req.user.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
}); 
//delete user
router.delete('/user/:id', auth.authenticateToken, auth.authorizeRoles ('super admin'), async (req, res) => {
    try {
        const user = await User.deleteById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user profile', error: error.message });
    }
});
module.exports = router;
