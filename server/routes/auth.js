// Express
const express = require('express');
const router = express.Router();
// Controllers
const authController = require('../controllers/auth');

router.patch('/setMetadata/:authId', authController.setMetadata);

module.exports = router;