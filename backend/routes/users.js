const express = require('express');
const router = express.Router();

const isUniquelogin = require('../middleware/unique-login');
const sanitizeFormAuth = require('../middleware/sanitize-form-auth');
const usersController = require('../controllers/users');

router.post('/signup', sanitizeFormAuth, isUniquelogin, usersController.signup);
router.post('/login', sanitizeFormAuth, usersController.login);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
