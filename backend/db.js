const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root_password',
  database: 'my_database'
});
// Conectează-te la baza de date
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message); // Log pentru eroare
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Exportă conexiunea pentru utilizare în alte fișiere
module.exports = db;
