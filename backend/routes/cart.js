const express = require("express");
const router = express.Router();
const axios = require("axios");
const { connectToDatabase } = require("./db");

// Discord Webhook URL (înlocuiește cu URL-ul webhook-ului tău)
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1325070364371320912/2eYQx6oadlVH1GLyKz08pQL-rRc4r4xiEATtXir4hAsjeRWtLHHmThkEIXE138Dhqsqt";

// Middleware pentru conectarea la baza de date
router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// Endpoint pentru adăugarea unui produs în coș
router.post("/", async (req, res) => {
  const { title, image, price, userId, profile, server, packageType } =
    req.body; // Inclus profile, server, și packageType

  try {
    // Inserăm produsul în baza de date
    const [result] = await req.db.execute(
      "INSERT INTO cart (user_id, name, image, price, profile, server, package, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, title, image, price, "RedM", "Erebor", "packageType", 1]
    );

    // Trimitem log pe Discord prin Webhook
    // await axios.post(DISCORD_WEBHOOK_URL, {
    //   username: "Shopping Cart Logger",
    //   embeds: [
    //     {
    //       title: "Produs adăugat în coș",
    //       color: 65280, // Verde pentru succes
    //       fields: [
    //         { name: "Produs", value: title, inline: true },
    //         { name: "Preț", value: `${price} €`, inline: true },
    //         { name: "Profil", value: profile, inline: true },
    //         { name: "Server", value: server, inline: true },
    //         { name: "Pachet", value: packageType, inline: true },
    //         { name: "User ID", value: userId, inline: false },
    //       ],
    //       thumbnail: {
    //         url: image, // Imaginea produsului
    //       },
    //       timestamp: new Date(),
    //     },
    //   ],
    // });

    res.status(201).json({
      message: "Item added to cart successfully!",
      itemId: result.insertId,
    });
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
