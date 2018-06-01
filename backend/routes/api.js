const express = require('express');
const router = express.Router();

const routeLogger = require('../middlewares/route-logger');
const errorHandler = require('../middlewares/error-handler');
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const roomRoutes = require('./rooms');

router.use(routeLogger.log);
router.use(errorHandler.errorHandler);

router.use('/users', userRoutes);
router.use('/rooms', auth.isAuthenticated, roomRoutes);

router.use(errorHandler.notFoundHandler);

module.exports = router;