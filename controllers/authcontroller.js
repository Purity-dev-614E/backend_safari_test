const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenservice");

// Register new user
const register = async (req, res) => {
    const { email, username, password, role } = req.body;
    try {
        await User.create(email, username, password, role);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login user and generate JWT token
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await User.validatePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT tokens
        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,  // ✅ Use correct secret
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

// Refresh Token
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired refresh token' });

        const newAccessToken = jwt.sign(
            { userId: decoded.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });
    });
};

module.exports = { register, login, refreshToken };
