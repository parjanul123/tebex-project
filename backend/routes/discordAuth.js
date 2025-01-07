const express = require("express");
const router = express.Router();
const axios = require("axios");

const CLIENT_ID = "1324412832380358788";
const CLIENT_SECRET = "axn6ObK5Fc1RBz1dNq8eo4JyQ3MEAkHW";
const REDIRECT_URI = "http://localhost:8081/api/discord/callback";

router.get("/login", (req, res) => {
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=identify email`;
  res.redirect(discordAuthUrl);
});

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

    // Get user details from Discord
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    // Save Discord user details in session
    req.session.discordUser = user;

    // Redirect to Cfx.re login
    res.redirect("http://localhost:3500/api/cfx/login");
  } catch (error) {
    console.error("Error during Discord OAuth2:", error.message);
    res.status(500).json({ message: "Authentication failed!" });
  }
});

module.exports = router;
