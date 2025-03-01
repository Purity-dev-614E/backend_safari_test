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
const eventsRoute = require('./routes/eventsRoute');
const UserRoute = require('./routes/userRoute');
require("dotenv").config();


const PORT = process.env.PORT || 5001;
const app = express();const winston = require('winston');
const { verifyToken } = require('./utils/tokenservice');


app.use(cors());
app.use(express.json());


app.use('/api/safari-groups', SafariGroupRoute , authenticateToken, authorizeRoles);
app.use('/api/members', MemberRoute , authenticateToken, authorizeRoles);
app.use('/api/attendance', AttendanceRoute, authenticateToken, authorizeRoles);
app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/profile', ProfileRoute,authenticateToken);
app.use('/api/events', eventsRoute, authenticateToken, authorizeRoles);
app.use('api/user' ,UserRoute, authenticateToken, verifyToken);

app.get('/safariapi', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

