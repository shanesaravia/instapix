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


module.exports = {
	getManagementToken
}