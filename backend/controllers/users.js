const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const emailValidator = require("email-validator");

const schema = new passwordValidator();

schema
.is().min(8)  
.is().max(65)                          
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()


exports.signup = (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   if (emailValidator.validate(email) && schema.validate(password)) {
      res.status(200).json({message: "ok"});
   } else if (!emailValidator.validate(email) && !schema.validate(password)) {
      res.status(500).json({message: "L'adresse email est invalide et le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 nombre, 1 caractère spécial et pas d'espace."});
   } else if (!emailValidator.validate(email)) {
      res.status(500).json({message: 'Adresse email invalide.'});
   } else {
      res.status(500).json({message: "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 nombre, 1 caractère spécial et pas d'espace."});
   }
};