const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const discordAuthRoutes = require("./routes/discordAuth");
const cfxRedmAuthRoutes = require("./routes/cfxRedmAuth");

const app = express();
const PORT = 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/discord", discordAuthRoutes);
app.use("/api/cfx", cfxRedmAuthRoutes);

// Start the server
app.listen(PORT, async () => {
  const { connectToDatabase } = require("./routes/db");
  try {
    await connectToDatabase();
    console.log("Database connection established.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
