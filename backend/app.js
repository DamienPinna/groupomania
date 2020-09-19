const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

const usersRoutes = require('./routes/users');
const publicationsRoutes = require('./routes/publications');
const commentsRoutes = require('./routes/comments');

const app = express();

/* CORS */
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

app.use(bodyParser.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;
