const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware'); // Ensure user is authenticated
const User = require('../models/usermodel'); // Adjust path based on your structure

// PUT /profile/update - Update user profile
router.put('/update', authMiddleware, async (req, res) => {
    const { full_name, display_photo, gender, location, next_of_kin, next_of_kin_number } = req.body;

    try {
        // Get user from middleware (assuming authMiddleware sets req.user)
        const userId = req.user.id;

        // Check if all required fields are present
        if (!full_name || !display_photo || !gender || !location || !next_of_kin || !next_of_kin_number) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Update user profile
        const updatedUser = await User.updateById(userId, {
            full_name, 
            display_photo, 
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

module.exports = router;
