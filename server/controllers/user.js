// Requests
const request = require('request');
// Firebase
const db = require('../utils/db');
// Logs
const logger = require('../configs/winston');

/**
 * @return {User object without password}
 */
const getUser = function(req, res) {
	logger.debug('getUser endpoint called');
	const userId = req.params.userId;
	const userRef = db.collection('users').doc(userId);

	userRef.get().then(doc => {
	    if (!doc.exists) {
	      console.log('Document does not exist');
	      res.send(false);
	    } else {
	    	logger.debug(`Retrieved user details for user ${userId}`, {userData: doc.data()})
	    	const id = doc.id;
	    	const data = doc.data();
			res.send({id, ...data});
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