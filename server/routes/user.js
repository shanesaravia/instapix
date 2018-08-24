const express = require('express');
const router = express.Router();

// const User = require('../models/User');
const userController = require('../controllers/user');

// Example GET request
// router.get('/', userController);

router.get('/test', userController.test);

module.exports = router;