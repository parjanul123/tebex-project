const express = require("express");
const router = express.Router();
const axios = require("axios"); // Import axios pentru cererea POST către Discord
const { connectToDatabase } = require("./db");

// Discord Webhook URL (înlocuiește cu URL-ul webhook-ului tău)
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1325070364371320912/2eYQx6oadlVH1GLyKz08pQL-rRc4r4xiEATtXir4hAsjeRWtLHHmThkEIXE138Dhqsqt";

// Middleware to connect to the database
router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// Add an item to the cart
router.post("/", async (req, res) => {
  const { title, image, price, userId, profile, server, package } = req.body; // Adăugăm profile, server și package

  try {
    // Adăugăm produsul în baza de date
    const [result] = await req.db.execute(
      "INSERT INTO cart (user_id, name, image, price, profile, server, package, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userId, title, image, price, profile, server, package, 1]
    );

    // Trimitere log pe Discord prin Webhook
    await axios.post(DISCORD_WEBHOOK_URL, {
      username: "Shopping Cart Logger", // Numele botului care trimite mesajul
      embeds: [
        {
          title: "Produs adăugat în coș",
          color: 65280, // Cod de culoare (verde)
          fields: [
            { name: "Titlu Produs", value: title, inline: true },
            { name: "Preț", value: `${price} $`, inline: true },
            { name: "User ID", value: userId, inline: false },
          ],
          thumbnail: {
            url: image, // Imaginea produsului
          },
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json({ message: "Item added to cart successfully!", itemId: result.insertId });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
});

module.exports = router;
