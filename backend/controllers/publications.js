const fs = require('fs');
const pool = require('../db');

/**
 * Créé une publication.
 */
exports.createPublication = (req, res) => {
   const regex = /<|>|"|&/;

   if (regex.test(req.body.title) ) {
      res.status(500).json({message: 'Les caractères < " & et > ne sont pas autorisés.'});
   } else {
      pool.query(`INSERT INTO post (title,dateStamp,gifUrl,userId)
                  VALUES ("${req.body.title}",NOW(),"${req.protocol}://${req.get('host')}/images/${req.file.filename}","${req.body.userId}");`,
      function (error, results, fields) {
         if (error) {
            fs.unlinkSync(`images/${req.file.filename}`);
            return res.status(503).json({message: 'Problème de connexion avec la base de données, veuillez réessayer plus tard.'});
         };
         res.status(200).json({message: 'Publication enregistrée'});
      });
   };
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
         pool.query(`DELETE FROM post
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
      if (error) {
         return res.status(503).json({message: 'Problème de connexion avec la base de données, veuillez réessayer plus tard.'});
      };
      res.status(200).json(results);
   });
};
