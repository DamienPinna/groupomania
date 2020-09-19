const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAccessPublications = require('../middleware/auth-access-publications');
const sanitize = require('../middleware/sanitize');
const multer = require('../middleware/multer-config');
const publicationsController = require('../controllers/publications');

router.post('/', auth, multer, publicationsController.createPublication);
router.put('/:id', sanitize, authAccessPublications, publicationsController.modifyPublication);
router.delete('/:id', authAccessPublications, publicationsController.deletePublication);
router.get('/:id', auth, publicationsController.getOnePublication);
router.get('/', auth, publicationsController.getAllPublications);

module.exports = router;
