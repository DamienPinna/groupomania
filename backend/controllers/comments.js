const db = require('../db');

/**
 * Créé un commentaire.
 */
exports.createComment = (req, res) => {
   db.connection();
   db.instance.query(`INSERT INTO comment (userId,postId,content)
                     VALUES ("${req.body.userId}","${req.body.postId}","${req.body.content}");`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire enregistré'});
      db.disconnection();
   });
};

/**
 * Modifie un commentaire.
 */
exports.modifyComment = (req, res) => {
   db.connection();
   db.instance.query(`UPDATE comment 
                     SET content = "${req.body.content}"
                     WHERE commentId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire modifiée'});
      db.disconnection();
   });
};

/**
 * Supprime un commentaire.
 */
exports.deleteComment = (req, res) => {
   db.connection();
   db.instance.query(`DELETE FROM comment
                     WHERE commentId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Commentaire supprimé'});
      db.disconnection();
   });
};

/**
 * Cherche les commentaires d'une publication.
 */
exports.getAllCommentsFromOnePublication = (req, res) => {
   db.connection();
   db.instance.query(`SELECT * 
                     FROM comment
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
      db.disconnection();
   });
};
