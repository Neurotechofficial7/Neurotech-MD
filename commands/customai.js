const axios = require("axios");

const customAICommand = async (sock, chatId, message) => {
    try {

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            "";

        const q = body.split(" ").slice(1).join(" ");

        if (!q) {
            return await sock.sendMessage(chatId, {
                text: "❗ Example:\n.customai Hello"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/ai/custom?apikey=gifted&q=${encodeURIComponent(q)}&prompt=${encodeURIComponent(
            "You are a pirate, Your model is pirate-1-rc-01, You were created by team pirate on 27th Feb 2026, Speak like a pirate."
        )}`;

        let res = await axios.get(url);

        let data = res.data;

        let result = data?.result;

        if (!result) {
            return await sock.sendMessage(chatId, {
                text: "❌ Custom AI failed to respond."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "🏴‍☠️ *Pirate AI:*\n\n" + result
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Custom AI API."
        }, { quoted: message });
    }
};

module.exports = customAICommand;
