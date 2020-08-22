const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.post('/', commentsController.createComment);
// router.put('/:id', commentsController.modifyComment);
// router.delete('/:id', commentsController.deleteComment);

module.exports = router;
