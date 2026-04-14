const axios = require("axios");

const deepImgCommand = async (sock, chatId, message) => {
    try {

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            "";

        const prompt = body.split(" ").slice(1).join(" ");

        if (!prompt) {
            return await sock.sendMessage(chatId, {
                text: "❗ Example:\n.deepimg a futuristic city at night"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/ai/deepimg?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;

        const res = await axios.get(url);

        const data = res.data;

        // API usually returns image URL in result or url field
        const imageUrl = data?.result || data?.url || data?.image;

        if (!imageUrl) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to generate image."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: `🎨 *Deep AI Image*\n\n📝 Prompt: ${prompt}`
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Deep AI Image API."
        }, { quoted: message });
    }
};

module.exports = deepImgCommand;
