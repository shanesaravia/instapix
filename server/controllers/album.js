// Requests
const request = require('request');
// Models
const albumSchema = require('../models/Album');
// Firebase
const db = require('../utils/db');
// Logs
const logger = require('../configs/winston');


/**
 * Get all albums in an array for a specific user
 * @return {array}     Array of albums
 */
const getAlbums = function(req, res) {
	logger.debug('getAlbums endpoint called');
	const userId = req.params.userId;
	const albumsRef = db.collection('users').doc(userId).collection('albums');

	const query = albumsRef.get().then(snapshot => {
		if (snapshot.empty) {
			logger.warn('No albums found');
		}

		// get the data of all the documents into an array
		let albums = snapshot.docs.map(function (documentSnapshot) {
			const id = documentSnapshot.id;
			const data = documentSnapshot.data();
			return {id, ...data};
		});

		// Reorder to put timeline first
		albums.forEach((album, idx) => {
			if(album.id === "timeline"){
				albums.splice(idx, 1);
				albums.unshift(album);
			}
		});

		logger.debug(`Retrieved albums for user ${userId}`, {albums})
		res.send(albums);
	}).catch(err => {
		logger.error(`Error getting albums for user ${userId}`);
		res.send(false);
	})
}

const createAlbum = async function(req, res) {
	/**
	 * Create an album for a user
	 * @return {bool}	true if album created successfully else false
	 */
	logger.debug('createAlbum endpoint called');

	const userId = req.params.userId;
	const albumName = req.body.name;
	const privacy = req.body.privacy == 'private' ? true : false;

    // Validate album with schema
    const album = await albumSchema.validate({
        locked: false,
        private: privacy
    }).catch((err) => {
        logger.error('Album unable to be validated', {error: err});
        return false;
    });

    if (album) {
		const albumRef = db.collection('users').doc(userId).collection('albums').doc(albumName);
		albumRef.set(album);
		logger.debug(`Created album ${albumName} for user ${userId}`, {privacy})
		res.send(true);
    } else {
	    logger.warn('Unable to validate User and Album');
        res.send(false);
    }
}

module.exports = {
	getAlbums,
	createAlbum
};