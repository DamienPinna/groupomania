const express = require('express');

const publicationsRoutes = require('./routes/publications');

const app = express();

app.use('/api/publications', publicationsRoutes);

module.exports = app;
