// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = require('schm');

// Photo Model
let photoSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		default: ''
	},
	likes: {
		type: Number,
		defualt: 0
	},
	album: {
		type: String, // album object
		required: true
	},
	comments: {
		type: String,
		default: []
	},
	caption: {
		type: String,
		default: ''
	},
	created_at: {
		type: Date,
		default: Math.floor(new Date() / 1000)
	}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;