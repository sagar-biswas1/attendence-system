const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const adminAttendanceRoutes = require('./adminAttendance');
const authenticateMiddleWire= require('../middleware/authentication')
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users',authenticateMiddleWire, userRoutes);
router.use('/api/v1/admin/attendance',authenticateMiddleWire, adminAttendanceRoutes);
module.exports = router;
