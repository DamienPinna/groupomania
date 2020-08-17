const express = require('express');
const db = require('./db');

const app = express();

db.connection();
db.instance.query('SELECT * FROM user', function (error, results, fields) {
   if (error) throw error;
   console.log(results);
});
db.disconnection();

app.use('/api/test',(req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
