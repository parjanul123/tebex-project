const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { connectToDatabase } = require("./db");

// Middleware pentru conectarea la baza de date
router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// Endpoint pentru înregistrare utilizator
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await req.db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Username or email already exists." });
    } else {
      res.status(500).json({ message: "Error registering user." });
    }
  }
});

// Endpoint pentru autentificare utilizator
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await req.db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // Verifică dacă utilizatorul există
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0]; // Selectează utilizatorul

    // Verifică parola hashuită
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
