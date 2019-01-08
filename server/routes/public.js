// Express
const express = require('express');
const router = express.Router();
// Controllers
const publicController = require('../controllers/public');

router.patch('/updateEmailVerified/:email', publicController.updateEmailVerified);
router.patch('/setMetaData/:authId', publicController.setMetadata);
router.post('/sendVerificationEmail', publicController.sendVerificationEmail);
router.post('/createUser', publicController.createUser);

module.exports = router;