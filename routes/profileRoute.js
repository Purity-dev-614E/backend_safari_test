const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware'); // Ensure user is authenticated
const User = require('../models/usermodel'); // Adjust path based on your structure

// PUT /profile/update - Update user profile
router.put('/update', authMiddleware.authenticateToken, async (req, res) => {
    const { full_name, display_photo, gender, location, next_of_kin, next_of_kin_number } = req.body;

    try {
        // Get user from middleware (assuming authMiddleware sets req.user)
        const userId = req.user.id;

        // Check if all required fields are present
        if (!full_name || !gender || !location || !next_of_kin || !next_of_kin_number) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Update user profile
        const updatedUser = await User.updateById(userId, {
            full_name, 
            gender, 
            location, 
            next_of_kin, 
            next_of_kin_number
        });

        res.json({ message: 'Profile updated successfully', user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

//fetch user profile
router.get('/profiledetails', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.getById(userId);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// DELETE /profile/delete - Delete user profile
router.delete('/deleteprofile', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        await User.deleteById(userId);
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
});

module.exports = router;
