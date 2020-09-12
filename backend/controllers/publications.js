const fs = require('fs');
const db = require('../db');

/**
 * Créé une publication.
 */
exports.createPublication = (req, res) => {
   db.connection();
   db.instance.query(`INSERT INTO post (title,dateStamp,gifUrl,userId)
                     VALUES ("${req.body.title}",NOW(),"${req.protocol}://${req.get('host')}/images/${req.file.filename}","${req.body.userId}");`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Publication enregistrée'});
      db.disconnection();
   });
};

/**
 * Modifie le titre de la publication.
 */
exports.modifyPublication = (req, res) => {
   db.connection();
   db.instance.query(`UPDATE post 
                     SET title = "${req.body.title}"
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Publication modifiée'});
      db.disconnection();
   });
};

/**
 * Supprime une publication.
 */
exports.deletePublication = (req, res) => {
   db.connection();
   db.instance.query(`SELECT gifUrl
                     FROM post
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      const filename = results[0].gifUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
         db.instance.query(`DELETE FROM post
                           WHERE postId = ${req.params.id};`,
         function (error, results, fields) {
            if (error) throw error;
            res.status(200).json({message: 'Publication supprimée'});
            db.disconnection();
         });
      });
   });
};

/**
 * Cherche une publication.
 */
exports.getOnePublication = (req, res) => {
   db.connection();
   db.instance.query(`SELECT postId, DATE_FORMAT(dateStamp, '%d/%m/%Y') AS date, title, gifUrl, post.userId, login, role 
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
      // La fonction getAllCommentsFromOnePublication va être appelée, il faut garder la connection à la DB.
   });
};

/**
 * Cherche toutes les publications.
 */
exports.getAllPublications = (req, res) => {
   db.connection();
   db.instance.query(`SELECT postId, DATE_FORMAT(dateStamp, '%d/%m/%Y') AS date, title, gifUrl, post.userId, login, role, (SELECT COUNT(*) FROM comment WHERE comment.postId = post.postId) AS nbComments
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId
                     ORDER BY postId;`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
      db.disconnection();
   });
};
