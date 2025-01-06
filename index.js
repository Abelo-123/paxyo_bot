require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.URL;

if (!BOT_TOKEN || !URL) {
    console.error("Missing BOT_TOKEN or URL in environment variables!");
    process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN);

// Set the webhook
bot.setWebHook(`${URL}/webhook/${BOT_TOKEN}`);

// Webhook endpoint
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body); // Process incoming updates
    res.sendStatus(200);
});

// Define a simple bot command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello!  bot is up and running on Vercel!");
});

// Start the express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
