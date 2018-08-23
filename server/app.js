const express = require('express');
const app = express();
// const db = require('./db.js');
const userRoutes = require('./routes/user')

app.use('/users', userRoutes)

module.exports = app;