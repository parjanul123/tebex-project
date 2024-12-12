// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample cart data
let cart = [];

// Hardcoded user data for demonstration
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Routes
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const item = req.body;
  cart.push(item);
  res.status(201).json(item);
});

app.delete("/api/cart/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  cart = cart.filter((item) => item.id !== itemId);
  res.status(204).send();
});

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
