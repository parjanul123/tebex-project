const express = require("express");
const router = express.Router();
const axios = require("axios");

// Discord OAuth2 Config
const CLIENT_ID = "YOUR_DISCORD_CLIENT_ID";
const CLIENT_SECRET = "YOUR_DISCORD_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:3500/api/discord/callback";

// Step 1: Redirect to Discord for Authentication
router.get("/login", (req, res) => {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=identify email`;
  res.redirect(discordAuthUrl);
});

// Step 2: Handle the callback from Discord
router.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ message: "No code provided!" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Use access token to fetch user details
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    // Return user data
    res.status(200).json({
      message: "Authentication successful!",
      user,
    });
  } catch (error) {
    console.error("Error during Discord OAuth2:", error.message);
    res.status(500).json({ message: "Authentication failed!" });
  }
});

module.exports = router;
