const db = require('../db');

/**
 * Créer une publication.
 */
exports.createPublication = (req, res) => {
   db.connection();
   db.instance.query(`INSERT INTO post (title,dateStamp,gifUrl,userId)
                     VALUES ("${req.body.title}",now(),"${req.body.gifUrl}","${req.body.userId}");`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Publication enregistrée'});
      db.disconnection();
   });
};

/**
 * Cherche une publication.
 */
exports.getOnePublication = (req, res) => {
   db.connection();
   db.instance.query(`SELECT postId, dateStamp, title, gifUrl, post.userId, login, role 
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId
                     WHERE postId = ${req.params.id};`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
      db.disconnection();
   }); 
};


/**
 * Cherche toutes les publications.
 */
exports.getAllPublications = (req, res) => {
   db.connection();
   db.instance.query(`SELECT postId, dateStamp, title, gifUrl, post.userId, login, role 
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId;`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
      db.disconnection();
   });
};
