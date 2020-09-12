const pool = require('../db');

/**
 * Créé un commentaire.
 */
exports.createComment = (req, res) => {
   pool.query(`INSERT INTO comment (userId,postId,content,dateStamp)
               VALUES (${req.body.userId},${req.body.postId},"${req.body.content}",NOW());`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire enregistré'});
   });
};

/**
 * Modifie un commentaire.
 */
exports.modifyComment = (req, res) => {
   pool.query(`UPDATE comment 
               SET content = "${req.body.content}"
               WHERE commentId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire modifiée'});
   });
};

/**
 * Supprime un commentaire.
 */
exports.deleteComment = (req, res) => {
   pool.query(`DELETE FROM comment
               WHERE commentId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire supprimé'});
   });
};

/**
 * Cherche les commentaires d'une publication.
 */
exports.getAllCommentsFromOnePublication = (req, res) => {
   pool.query(`SELECT commentId, comment.userId, login, postId, content, DATE_FORMAT(dateStamp, '%d/%m/%Y') AS date 
               FROM comment
               LEFT JOIN user
               ON comment.userId = user.userId
               WHERE postId = ${req.params.id}
               ORDER BY commentId;`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
   });
};
