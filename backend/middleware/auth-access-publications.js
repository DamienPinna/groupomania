require('dotenv').config()
const jwt = require('jsonwebtoken');
const pool = require('../db');

/**
 * Authentifie un utilisateur et contrôle que l'opération est autorisée pour cet utilisateur.
 */
module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const userIdFromToken = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userIdFromToken) {
         throw 'id utilisateur invalide';
      } else {
         pool.query(`SELECT postId, userId
               FROM post
               WHERE postId = ${req.params.id};`,
         function (error, results, fields) {
            if (error) throw error;
            const userIdFromPost = results[0].userId;
            if (userIdFromPost === userIdFromToken || decodedToken.role === 'admin') next();
            else res.status(403).json({message: 'accès refusé'});
         });
      };
   } catch (error) {
      res.status(401).json({error});
   };
};
