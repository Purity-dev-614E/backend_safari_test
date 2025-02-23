// const express = require('express');
// const router = express.Router();
// const User = require ('../models/usermodel')
// const { authMiddleware } = require('../middleware/authmiddleware');

// console.log('Loading profileRoute.js'); // Add this line

// // Update Profile (Protected Route)
// router.put('/update', authMiddleware, async (req, res) => {
//     const { gender, location, nk, contact_nk, profile_picture } = req.body;
//     const userId = req.user.id; // Extracted from JWT

//     if (!gender || !location || !nk || !contact_nk) {
//         return res.status(400).json({ error: 'All fields are required except profile picture' });
//     }

//     try {
//         await User.updateProfile(userId, gender, location, nk, contact_nk, profile_picture);
//         res.json({ message: 'Profile updated successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
