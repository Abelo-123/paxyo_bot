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
bot.setWebHook(`${URL}webhook/${BOT_TOKEN}`);

// Webhook endpoint
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body); // Process incoming updates
    res.sendStatus(200);
});

// Define a simple bot command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a welcome message
    bot.sendMessage(chatId, `🚀 Welcome to Paxyo!`);

    // Send an image with a caption and an inline keyboard
    bot.sendPhoto(
        chatId,
        `${URL}bot.jpg`, // Path to the local image file
        {
            caption: `What does this bot do?\n\nNeed to grow your social media? This tool helps you get instant followers, views, likes, and many more on major platforms. Paxyo: It’s fast, affordable, and comes with reliable customer support to help you every step of the way.`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '⚡Launch App',
                            url: 'https://t.me/PaxyoMini_bot?startapp', // Replace with your mini app URL
                        },
                    ],
                ],
            },
        }
    ).catch((err) => {
        console.error('Error sending photo:', err);
    });
});


// Start the express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
