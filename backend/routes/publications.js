const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const publicationsController = require('../controllers/publications');

router.post('/', auth, multer, publicationsController.createPublication);
router.put('/:id', auth, publicationsController.modifyPublication);
router.delete('/:id', auth, publicationsController.deletePublication);
router.get('/:id', auth, publicationsController.getOnePublication);
router.get('/', auth, publicationsController.getAllPublications);

module.exports = router;
