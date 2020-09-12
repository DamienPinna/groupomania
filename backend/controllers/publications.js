const fs = require('fs');
const pool = require('../db');

/**
 * Créé une publication.
 */
exports.createPublication = (req, res) => {
   pool.query(`INSERT INTO post (title,dateStamp,gifUrl,userId)
                     VALUES ("${req.body.title}",NOW(),"${req.protocol}://${req.get('host')}/images/${req.file.filename}","${req.body.userId}");`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Publication enregistrée'});
   });
};

/**
 * Modifie le titre de la publication.
 */
exports.modifyPublication = (req, res) => {
   pool.query(`UPDATE post 
                     SET title = "${req.body.title}"
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Publication modifiée'});
   });
};

/**
 * Supprime une publication.
 */
exports.deletePublication = (req, res) => {
   pool.query(`SELECT gifUrl
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
         });
      });
   });
};

/**
 * Cherche une publication.
 */
exports.getOnePublication = (req, res) => {
   pool.query(`SELECT postId, DATE_FORMAT(dateStamp, '%d/%m/%Y') AS date, title, gifUrl, post.userId, login, role 
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
   });
};

/**
 * Cherche toutes les publications.
 */
exports.getAllPublications = (req, res) => {
   pool.query(`SELECT postId, DATE_FORMAT(dateStamp, '%d/%m/%Y') AS date, title, gifUrl, post.userId, login, (SELECT COUNT(*) FROM comment WHERE comment.postId = post.postId) AS nbComments
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     ORDER BY postId;`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
   });
};
