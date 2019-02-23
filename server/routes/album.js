// Express
const express = require('express');
const router = express.Router({mergeParams: true});
// Controllers
const albumController = require('../controllers/album');

// Example GET request
// router.get('/', (req, res) => {
// 	res.send('album route!!!');
// });

router.get('/', albumController.getAlbums);

router.post('/', albumController.createAlbum);

module.exports = router;