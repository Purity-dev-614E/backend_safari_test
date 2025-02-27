const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };

