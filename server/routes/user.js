// Express
const express = require('express');
const router = express.Router();
// Auth
const auth = require('../utils/auth');
// Controllers
const userController = require('../controllers/user');
// Routers
const albumsRouter = require('./album');

// SubRoutes
router.use('/:userId/albums/', albumsRouter);

router.get('/:userId', userController.getUser);

module.exports = router;