const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Conexiunea la baza de date

const router = express.Router();

// Ruta pentru înregistrare
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Request body:', req.body); // Log pentru debug

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Verifică dacă utilizatorul există deja
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error during SELECT:', err); // Log eroare SELECT
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length > 0) {
      console.log('User already exists:', email); // Log utilizator existent
      return res.status(400).json({ message: 'User already exists.' });
    }

    try {
      // Creează un hash al parolei
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword); // Log parola hashată

      // Salvează utilizatorul în baza de date
      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Database error during INSERT:', err); // Log eroare INSERT
            return res.status(500).json({ message: 'Database error.' });
          }

          console.log('User registered successfully:', email); // Log utilizator înregistrat
          res.status(201).json({ message: 'User registered successfully!' });
        }
      );
    } catch (err) {
      console.error('Error hashing password:', err); // Log eroare hashing
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
});

// Exportă rutele
module.exports = router;
