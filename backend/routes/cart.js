const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

// Middleware pentru conectarea la baza de date
router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// Endpoint pentru adăugarea unui produs în coș
router.post("/", async (req, res) => {
  const { title, image, price, userId, profile, server, packageType } = req.body;

  try {
    const [result] = await req.db.execute(
      "INSERT INTO cart (user_id, name, image, price, profile, server, package, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, title, image, price, profile, server, packageType, 1]
    );

    res.status(201).json({ message: "Item added to cart successfully!", itemId: result.insertId });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
});

// Endpoint pentru vizualizarea produselor din coș
router.get("/", async (req, res) => {
  try {
    const [rows] = await req.db.execute("SELECT * FROM cart");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items." });
  }
});

// Endpoint pentru ștergerea unui produs din coș
router.delete("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await req.db.execute("DELETE FROM cart WHERE id = ?", [itemId]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Error deleting cart item." });
  }
});

module.exports = router;
