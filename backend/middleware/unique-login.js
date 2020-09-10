const db = require('../db');

module.exports = (req, res, next) => {
   db.connection();
   db.instance.query(`SELECT login
                     FROM user;`,
   function (error, results, fields) {
      if (error) throw error;
      const users = JSON.parse(JSON.stringify(results)); //users est un tableau contenant des objets.
 
      let loginIsUnique = true;

      users.forEach(user => {
         if (user.login.toLowerCase() === req.body.login.toLowerCase()) {
            res.status(409).json({message: 'Ce pseudonyme est déjà utilisé !'});
            loginIsUnique = false;
            db.disconnection();
         };
      });
      if (loginIsUnique) next();
   });
};
