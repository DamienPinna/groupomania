const express = require('express');
const app = express();

app.use('/api/test',(req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
