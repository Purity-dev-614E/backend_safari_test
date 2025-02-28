const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

let refreshTokens = [];  // In-memory storage (this should be replaced with a real database in production)

const storeRefreshToken = (userId, refreshToken) => {
    // Store the refresh token in your database or in-memory (this is just an example using an array)
    refreshTokens.push({ userId, refreshToken });
};

module.exports = { storeRefreshToken };

storeRefreshToken(user.id, generateAccessToken);

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };

