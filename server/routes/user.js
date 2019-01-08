// Express
const express = require('express');
const router = express.Router();
// Auth
const auth = require('../utils/auth');
// Controllers
const userController = require('../controllers/user');

router.get('/:userId', userController.getUser);
router.get('/', userController.getUserManagement);

module.exports = router;