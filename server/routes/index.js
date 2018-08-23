// const express = require('express');
// const parseurl = require('parseurl');
// const bodyParser = require('body-parser');
// const path = require('path');
// const expressValidator = require('express-validator');
// const mongoose = require('mongoose');
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
// const app = express();
const url = 'mongodb://localhost:27017/instapix-local';
const app = require('../server');

app.get('/', (req, res) => {
	res.send('Instapix Working!');
});

// app.post('/users', )