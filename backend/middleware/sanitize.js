module.exports = (req, res, next) => {
   const reqBody = req.body;
   const regex = /<|>|"|&/;

   if (regex.test(reqBody.title) || regex.test(reqBody.content)) {
      res.status(500).json({message: 'Les caractères < " & et > ne sont pas autorisés.'});
   } else {
      next();
   };
};
