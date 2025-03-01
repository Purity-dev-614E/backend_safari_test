const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const { generateAccessToken, generateRefreshToken } = require("../utils/tokenservice");
const { error } = require('winston');

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

 const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error : 'Refresh token required'});


  const storedToken = getStoredRefreshToken(user.id);
  if (storedToken !== refreshToken) return res.status(403).json({ error : "invalid refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({error : "invalid or expired refresh token" });

            
    const newAccessToken = jwt.sign({ userId: decode.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
    res.json({accessToken: newAccessToken});

});

};

module.exports = { register, login, refreshToken };




