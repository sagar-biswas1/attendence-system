const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const adminAttendanceRoutes = require('./adminAttendance');
const studentAttendanceRoutes = require('./studenceAttendence');
const authenticateMiddleWire= require('../middleware/authentication')
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users',authenticateMiddleWire, userRoutes);
router.use('/api/v1/admin/attendance',authenticateMiddleWire, adminAttendanceRoutes);
router.use('/api/v1/student/attendance',authenticateMiddleWire, studentAttendanceRoutes);
module.exports = router;
