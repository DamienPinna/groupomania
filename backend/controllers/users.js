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

/**
 * Créé un utilisateur et hache son mot de passe.
 */
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


/**
 * Identifie un utilisateur.
 */
exports.login = async (req, res) => {
   db.connection();
   db.instance.query(`SELECT userId, login, password
                     FROM user
                     WHERE login="${req.body.login}";`,
   async function (error, results, fields) {
      if (error) throw error;
      const user = JSON.parse(JSON.stringify(results)); //user est un tableau contenant un objet.
      if (user.length === 0) return res.status(400).json({error: 'Login et/ou mot de passe incorrect !'});
      try {
         const valid = await bcrypt.compare(req.body.password, user[0].password);
         if(!valid) return res.status(400).json({error: 'Login et/ou mot de passe incorrect !'});
         res.status(200).json({
            userId: user[0].userId,
            token: jwt.sign(
               {userId: user[0].userId},
               process.env.SECRET,
               {expiresIn: '24h'}
            )
         });
         db.disconnection();
      } catch (error) {
         res.status(500).json({error});
      };
   });
};
