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
    const { username, password } = req.body;
    try {
        const user = await User.getByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await User.validatePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user); // If rotating tokens

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.sendStatus(403); // Invalid token
  }
};

module.exports = { register, login, refreshToken };

// Refresh token


