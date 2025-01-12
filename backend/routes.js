const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const serverAuthRoutes = require("./routes/serverAuth"); // Rutele pentru server owners
const discordAuthRoutes = require("./routes/discordAuth");
const cfxRedmAuthRoutes = require("./routes/cfxRedmAuth");

const app = express();
const PORT = 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rute
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/server-auth", serverAuthRoutes); // Prefix pentru rutele de server owners
app.use("/api/discord", discordAuthRoutes);
app.use("/api/cfx", cfxRedmAuthRoutes);

// Start server
app.listen(PORT, async () => {
  const { connectToDatabase } = require("./routes/db");
  try {
    await connectToDatabase();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
