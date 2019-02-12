// Models
const User = require('../models/User');
// Auth
const auth = require('./auth');
// Requests
const request = require('request');
// Firebase
const db = require('../utils/db');
// Configs
const { authManager } = require('../configs/config');

/**
 * @return {User object without password}
 */
const getUser = function(req, res) {
	const userId = req.params.userId;
	const userRef = db.collection('users').doc(userId);

	userRef.get().then(doc => {
	    if (!doc.exists) {
	      console.log('Document does not exist');
	      res.send(false);
	    } else {
	      console.log('User Data:', doc.data());
	      res.send(doc.data());
	    }
	})
	.catch(err => {
		console.log('Error getting document', err);
		res.status(500).send(false);
	});

};


module.exports = {
	getUser
};