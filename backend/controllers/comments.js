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
