require('dotenv').config()
const mysql = require('mysql');

const db = {
   instance: null,

   connection() {
      this.instance = mysql.createConnection({
         host     : process.env.DB_HOST,
         user     : process.env.DB_USER,
         password : process.env.DB_PASS,
         database : process.env.DB_NAME
      });
      this.instance.connect(function(error) {
         if (error) {
            console.error('Error connecting: ' + error.stack);
            return;
         }
         console.log('Successful database connection.');
      });
   },

   disconnection() {
      this.instance.end();
   }
}

module.exports = db;
