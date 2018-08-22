const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Album Model
let albumSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	photos: {
		type: String,
		default: [] // photo objects
	},
	privacy_status: Boolean, // Public or private album status
	created_at: {
		type: Date,
		default: Math.floor(new Date() / 1000)
	}
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;