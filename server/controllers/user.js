const User = require('../models/User');
// const db = require('../db');

let test = function(req, res, next) {
	let shane = new User({
		id: 1,
		first_name: 'Shane',
		last_name: 'Saravia',
		username: 'flawless',
		password: 'test123',
		email: 'shanesaravia@live.ca'
	})
	User.create(shane);
	return res.send('User created!');
};

module.exports = {test};