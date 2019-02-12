// Express
const express = require('express');
const app = express();
// database
// const db = require('./db');
// Auth
const auth = require('./utils/auth');
// Third Party
const bodyParser = require('body-parser');
// CORS
const cors = require('cors');
const corsConfig = require('./configs/config');

// Routes
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes');
const userRoutes = require('./routes/user');
// const albumRoutes = require('./routes/album');
// const photoRoutes = require('./routes/photo');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors(corsConfig.corsOptions));
// app.use(auth.jwtCheck);

// Routes
app.use('/api/', indexRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/auth', auth.jwtCheck, authRoutes);
app.use('/api/user', auth.jwtCheck, userRoutes);
// app.use('/album', albumRoutes);
// app.use('/photo', photoRoutes);

module.exports = app;