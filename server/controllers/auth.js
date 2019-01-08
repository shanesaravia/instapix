// Requests
const request = require('request');
// Auth
const { authManager } = require('../configs/config');

/**
 * Retrieves auth0 management api token
 * @return {Promise} Resolves if status == 200
 */
const getManagementToken = function() {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: authManager.base_url + authManager.token_url,
			headers: { 'content-type': 'application/json' },
			body: {
				grant_type: authManager.grant_type,
				client_id: authManager.client_id,
				client_secret: authManager.client_secret,
				audience: authManager.audience
			}, json: true
		};
		// Retrieve management api access token
		request(options, function (err, resp, body) {
			if (err) reject(err);
            if (resp.statusCode != 200) {
                reject('Invalid status code <' + resp.statusCode + '>');
            } else {
				resolve(body.access_token);
            }
		});
	})
}

/**
 * Retrieves instapix id using auth0 Management API
 */
const getInstapixId = async function(auth_id, mgmtToken) {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'GET',
			url: authManager.base_url + authManager.endpoints.user_url + auth_id,
			headers: { 
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + mgmtToken
			}
		};

		// Send Request
		request(options, function (err, resp, body) {
			const data = JSON.parse(body);
			console.log('data: ', data);
			console.log('status: ', resp.statusCode);

			if (err) reject(err);
	        if (resp.statusCode != 200) {
	            reject('Invalid status code <' + resp.statusCode + '>');
	        } else {
				resolve(data.user_metadata.instapix_id);
	        }
		})
	})
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
	const data = req.body;
	let metadata = {"user_metadata": {}};

	// Add data to metadata object
	for (i in data) {
		metadata.user_metadata[i] = data[i]
	};

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

module.exports = {
	getManagementToken,
	getInstapixId,
	setMetadata
}