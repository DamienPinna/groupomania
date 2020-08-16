require('dotenv').config()
const express = require('express');
const mysql = require('mysql');

const app = express();

/* Connexion à la base de données MySQL */
const connection = mysql.createConnection({
   host     : process.env.DB_HOST,
   user     : process.env.DB_USER,
   password : process.env.DB_PASS,
   database : process.env.DB_NAME
});

connection.connect(function(err) {
   if (err) {
   console.error('error connecting: ' + err.stack);
   return;
   }

   console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM user', function (error, results, fields) {
   if (error) throw error;
   console.log(results);
});

connection.end();

app.use('/api/test',(req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
