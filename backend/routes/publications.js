const express = require('express');
const router = express.Router();

const publicationsController = require('../controllers/publications');

router.get('/', publicationsController.getAllPublications);

module.exports = router;
