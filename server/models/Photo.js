const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Photo Model
let photoSchema = new Schema({
	id: Number,
	created_at: Date
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;