const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  const CFX_CLIENT_ID = "CFX_CLIENT_ID";
  const CFX_REDIRECT_URI = "http://localhost:3500/api/cfx/callback";
  const cfxAuthUrl = `https://login.cfx.re/authorize?client_id=${CFX_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    CFX_REDIRECT_URI
  )}&response_type=code&scope=identify`;
  res.redirect(cfxAuthUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ message: "No code provided!" });
  }

  try {
    // Assuming you handle Cfx.re OAuth2 token exchange and user info retrieval
    const cfxUser = {
      id: "12345",
      name: "CFX User",
    };

    // Merge Discord and Cfx.re user data
    const userData = {
      discord: req.session.discordUser,
      cfx: cfxUser,
    };

    // Save the combined user data in session or database
    req.session.user = userData;

    res.status(200).json({ message: "Authentication successful!", user: userData });
  } catch (error) {
    console.error("Error during Cfx.re OAuth2:", error.message);
    res.status(500).json({ message: "Authentication failed!" });
  }
});

module.exports = router;
