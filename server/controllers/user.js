// Models
const User = require('../models/User');
// Auth
const auth = require('./auth');
// Requests
const request = require('request');
// Configs
const { authManager } = require('../configs/config');

/**
 * @return {User object without password}
 */
const getUser = function(req, res) {
	const userId = req.params.userId;

	User.findById(userId, (err, user) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(user);
		}
	})
};

/**
 * @return {User object without password}
 */
const getUserManagement = async function(req, res) {
	const auth_id = req.user.sub;
	const mgmtToken = await auth.getManagementToken();
	const instapix_id = await auth.getInstapixId(auth_id, mgmtToken);

	User.findById(instapix_id, (err, user) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(user);
		}
	});
};


module.exports = {
	getUser,
	getUserManagement
};