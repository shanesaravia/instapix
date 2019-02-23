const Schema = require('schm');

// Album Model
let albumSchema = new Schema({
	locked: Boolean, // Album unable to be deleted
	private: Boolean, // Public or private album status
	created_at: {
		type: Date,
		default: Math.floor(new Date() / 1000)
	}
});

module.exports = albumSchema;