const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const authenticateMiddlewire= require('../middleware/authentication')
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users',authenticateMiddlewire, userRoutes);
module.exports = router;
