const db = require('../db');

exports.getAllPublications = (req, res) => {
   db.connection();
   db.instance.query(`SELECT postId, dateStamp, gifUrl, post.userId, login, role 
                     FROM post
                     INNER JOIN user
                     ON post.userId = user.userId
                     INNER JOIN role
                     ON user.roleId = role.roleId;`,
   function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
   });
   db.disconnection();
};
