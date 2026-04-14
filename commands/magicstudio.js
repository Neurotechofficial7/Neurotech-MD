const axios = require("axios");

const magicStudioCommand = async (sock, chatId, message) => {
    try {

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            "";

        const prompt = body.split(" ").slice(1).join(" ");

        if (!prompt) {
            return await sock.sendMessage(chatId, {
                text: "❗ Example:\n.magicstudio a futuristic castle in the sky"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/ai/magicstudio?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;

        const res = await axios.get(url);

        const data = res.data;

        // Different APIs return different keys
        const imageUrl = data?.result || data?.url || data?.image || data?.data?.url;

        if (!imageUrl) {
            return await sock.sendMessage(chatId, {
                text: "❌ Magic Studio failed to generate image."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: `✨ *Magic Studio AI*\n\n📝 Prompt: ${prompt}`
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Magic Studio API."
        }, { quoted: message });
    }
};

module.exports = magicStudioCommand;
