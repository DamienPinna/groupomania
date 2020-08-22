const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const publicationsController = require('../controllers/publications');

router.post('/', multer, publicationsController.createPublication);
router.get('/:id', publicationsController.getOnePublication);
router.get('/', publicationsController.getAllPublications);

module.exports = router;
