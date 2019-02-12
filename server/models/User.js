// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = require('schm');

// User Model
let userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	email_verified: {
		type: Boolean,
		default: false
	},
	display_picture: {
		type: String,
		default: ''
	},
	followers: {
		type: Number,
		default: 0
	},
	following: {
		type: Number,
		default: 0
	},
	fame: {
		type: Number, // Total number of likes to show popularity
		default: 0
	},
	bio: {
		type: String,
		default: ''
	},
	albums: [{
		type: String,
		ref: 'Album'
	}],
	photos: [{
		type: String, 
		ref: 'Photo'
	}],
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = userSchema;