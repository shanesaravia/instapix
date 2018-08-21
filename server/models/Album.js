const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Album Model
let albumSchema = new Schema({
	id: Number,
	photos: [],
	created_at: Date
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;