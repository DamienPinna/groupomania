module.exports = (req, res, next) => {
   const userObject = req.body;
   const regex = /<|>|"|&/;
   if (regex.test(userObject.login) || regex.test(userObject.password)) {
      res.status(500).json({message: 'Les caractères < " & et > ne sont pas autorisés.'});
   } else {
      next();
   };
};
