const express = require('express');
const cors = require('cors');
const nodemon = require('nodemon');
const pgp = require('pg-promise')();
const SafariGroupRoute = require('./routes/safariGroupRoute');
const MemberRoute = require('./routes/membersroute'); 
const AttendanceRoute = require('./routes/attendanceRoute');
const AuthRoute = require('./routes/authRoutes');
const { authenticateToken, authorizeRoles } = require('./middleware/authmiddleware');
const ProfileRoute = require('./routes/profileRoute')
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/safari-groups', (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Safari Groups`);
  next();
}, SafariGroupRoute, authenticateToken, authorizeRoles);

app.use('/api/members', (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Members`);
  next();
}, MemberRoute, authenticateToken, authorizeRoles);

app.use('/api/attendance', (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Attendance`);
  next();
}, AttendanceRoute, authenticateToken, authorizeRoles);

app.use('/api/auth', (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url} - Auth`);
  next();
}, AuthRoute);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/safariapi', (req, res) => {
  logger.info('Welcome to the API');
  res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, () => {
  logger.info('Server is running on port 5000');
});
app.use(cors());
app.use(express.json());


app.use('/api/safari-groups', SafariGroupRoute , authenticateToken, authorizeRoles);
app.use('/api/members', MemberRoute , authenticateToken, authorizeRoles);
app.use('/api/attendance', AttendanceRoute, authenticateToken, authorizeRoles);
app.use('/api/auth', AuthRoute);
app.use('/api/profile', ProfileRoute);

app.get('/safariapi', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
