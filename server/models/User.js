const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Model
let userSchema = new Schema({
	id: Number,
	first_name: String,
	last_name: String,
	username: String,
	photos: [{type: Number, ref: 'Photo'}],
	created_at: Date,
	updated_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;