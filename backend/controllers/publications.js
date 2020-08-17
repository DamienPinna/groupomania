const db = require('../db');

exports.getAllPublications = (req, res) => {
   db.connection();
   db.instance.query('SELECT * FROM post', function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
   });
   db.disconnection(); 
};