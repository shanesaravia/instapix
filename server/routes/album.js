// Express
const express = require('express');
const router = express.Router();
// Controllers
const Album = require('../models/Album');

// Example GET request
router.get('/', (req, res) => {
	res.send('album route!!!');
});

module.exports = router;