// Models
const User = require('../models/User');
// Requests
const request = require('request');
// Auth
const { getManagementToken } = require('./auth');
// Configs
const { authManager } = require('../configs/config');


/**
 * Creates user in instapix db
 * @param  {obj} req contains username, email, auth_id
 * @param  {obj} res response obj
 * @return {obj/bool}     user obj if success else false
 */
const createUser = function(req, res) {

	if (req.body.username &&
		req.body.email &&
		req.body.auth_id) {
		let userData = new User({
			username: req.body.username,
			email: req.body.email,
			auth_id: req.body.auth_id
		})
		User.create(userData, (err, user) => {
			if (err) {
				return err;
			} else {
				return res.send(user);
			}
		});
	} else {
		return res.send(false);
	}
};

/**
 * Updates email verified field
 * @param  {obj} req contains email and email verified bool
 * @param  {obj} res response obj
 * @return {bool}
 */
const updateEmailVerified = function(req, res) {
	const email = req.params.email;
	const data = {'email_verified': true}

	try {
		User.updateOne({ email }, { $set: data }, (err, updated) => {
			if (err) {
				throw err;
			} else if (updated.ok) {
				res.send(true);
			}
		});
	} catch (err) {
		res.send(500).send(err);
	}
}

/**
 * Sets user_metadata in auth0 profile
 * Used for setting instapix_id on user creation
 * @param  {obj} req request
 * @param  {obj} res response
 * @return {bool} if status code is 200 or 201 sends true
 */
const setMetadata = async function(req, res) {
	const access_token = await getManagementToken();
	const auth_id = req.params.authId;
	const instapix_id = req.body.instapix_id;
	let metadata = {"user_metadata": {instapix_id}};

	// Request options
	const options = {
		method: 'PATCH',
		url: authManager.base_url + authManager.endpoints.user_url + auth_id,
		timeout: 5000, // 5 seconds
		headers: {
			'authorization': `Bearer ${access_token}`,
			'content-type': 'application/json'
		},
		body: metadata, 
		json: true
	};

	// Send request to auth0
	request(options, function(err, resp, body) {
		if (err) console.log(err);
		if ([200, 201].includes(resp.statusCode)) {
			res.send(true);
		} else {
			res.send(false);
		}
	})
}

/**
 * Sends verification email to user via auth0 management api
 * @param  {request object} req request data
 * @param  {response object} res response data
 * @return {bool}
 */
const sendVerificationEmail = async function(req, res) {
	const access_token = await getManagementToken();
	const user_id = req.body.userId;
	const client_id = authManager.client_id;

	// Request options
	const options = {
		method: 'POST',
		url: authManager.base_url + authManager.endpoints.verify_email_url,
		timeout: 5000, // 5 seconds
		headers: {
			'authorization': `Bearer ${access_token}`,
			'content-type': 'application/json'
		},
		body: {
			user_id,
			client_id
		}, json: true
	};

	// Send request to auth0
	request(options, function(err, resp, body) {
		if (err) console.log(err);
		if ([200, 201].includes(resp.statusCode)) {
			res.send(true);
		} else {
			res.send(false);
		}
	})
}

module.exports = {
	createUser,
	updateEmailVerified,
	setMetadata,
	sendVerificationEmail
};