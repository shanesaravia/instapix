const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model
let userSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	first_name: String,
	last_name: String,
	email: {
		type: String,
		required: true
	},
	display_picture: String,
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
		defualt: ''
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	albums: [{
		type: String,
		ref: 'Album'
	}]
	photos: [{
		type: String, 
		ref: 'Photo'
	}],
	created_at: {
		type: Date,
		default: Math.floor(new Date() / 1000)
	},
	updated_at: {
		type: Date,
		default: Math.floor(new Date() / 1000)
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;