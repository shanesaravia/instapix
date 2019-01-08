const mongoose = require('mongoose');
const { dbConfig } = require('./configs/config');

// mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.connection, {useNewUrlParser:true})
.catch((err) => {
	console.log('Could not connect to database');
});
// to remove depreciation warning
mongoose.set('useCreateIndex', true);