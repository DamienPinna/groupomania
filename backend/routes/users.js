const express = require('express');
const router = express.Router();

const isUniquelogin = require('../middleware/unique-login');
const usersController = require('../controllers/users');

router.post('/signup', isUniquelogin, usersController.signup);
router.post('/login', usersController.login);

module.exports = router;
