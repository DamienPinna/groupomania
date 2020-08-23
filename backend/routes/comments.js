const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentsController = require('../controllers/comments');

router.post('/', auth, commentsController.createComment);
router.put('/:id', auth, commentsController.modifyComment);
router.delete('/:id', auth, commentsController.deleteComment);
router.get('/:id', auth, commentsController.getAllCommentsFromOnePublication);

module.exports = router;
