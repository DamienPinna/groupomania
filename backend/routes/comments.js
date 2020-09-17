const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAccessComments = require('../middleware/auth-access-comments');
const commentsController = require('../controllers/comments');

router.post('/', auth, commentsController.createComment);
router.put('/:id', authAccessComments, commentsController.modifyComment);
router.delete('/:id', authAccessComments, commentsController.deleteComment);
router.get('/:id', auth, commentsController.getAllCommentsFromOnePublication);

module.exports = router;
