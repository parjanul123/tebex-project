// routes/cart.js
const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("./db");

// Middleware to connect to the database
router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const [rows] = await req.db.execute("SELECT * FROM cart");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart data" });
  }
});

// Add an item to the cart
router.post("/", async (req, res) => {
  const { title, userId } = req.body;

  try {
    const [result] = await req.db.execute(
      "INSERT INTO cart (user_id, name, quantity) VALUES (?, ?, ?)",
      [userId, title, 1]
    );
    res.status(201).json({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
});

// Delete an item from the cart
router.delete("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    await req.db.execute("DELETE FROM cart WHERE id = ?", [itemId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting item from cart" });
  }
});

module.exports = router;
