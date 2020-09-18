const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAccessComments = require('../middleware/auth-access-comments');
const sanitize = require('../middleware/sanitize');
const commentsController = require('../controllers/comments');

router.post('/', sanitize, auth, commentsController.createComment);
router.put('/:id', sanitize, authAccessComments, commentsController.modifyComment);
router.delete('/:id', authAccessComments, commentsController.deleteComment);
router.get('/:id', auth, commentsController.getAllCommentsFromOnePublication);

module.exports = router;
