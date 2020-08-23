const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
.is().min(8)  
.is().max(65)                          
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()


exports.signup = async (req, res) => {
   const password = req.body.password;

   if (schema.validate(password)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.connection();
      db.instance.query(`INSERT INTO user (login,password)
                        VALUES ("${req.body.login}","${hashedPassword}");`,
      function (error, results, fields) {
         if (error) throw error;
         res.status(200).json({message: 'Utilisateur enregistré'});
         db.disconnection();
      });
   } else {
      res.status(500).json({message: "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 nombre, 1 caractère spécial et pas d'espace."});
   };
};
