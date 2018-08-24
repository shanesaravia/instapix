const express = require('express');
const app = express();
const db = require('./db.js');
const userRoutes = require('./routes/user');
// const albumRoutes = require('./routes/album');
// const photoRoutes = require('./routes/photo');

app.use('/users', userRoutes);
// app.use('/album', albumRoutes);
// app.use('/photo', photoRoutes);

module.exports = app;