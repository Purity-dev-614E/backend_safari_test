const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: 'Expired token' });  // ✅ Only one response
            } else {
                return res.status(401).json({ message: 'Invalid token' });  // ✅ Only one response
            }
        }
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware/route handler
    });
};

// Middleware to authorize user roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user; // role from decoded JWT

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'You do not have permission to access this resource' });
        }

        next();
    };
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access token is required' });
    }

    // Verify token with the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }

        req.user = decoded;  // Attach user info to the request object for later use
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticateToken, authorizeRoles, verifyToken};
