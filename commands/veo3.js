const axios = require("axios");

const veo3Command = async (sock, chatId, message) => {
    try {

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            "";

        const prompt = body.split(" ").slice(1).join(" ");

        if (!prompt) {
            return await sock.sendMessage(chatId, {
                text: "❗ Example:\n.veo3 a cat playing piano"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/ai/veo3?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;

        const res = await axios.get(url);

        const data = res.data;

        // API may return video or image link
        const mediaUrl =
            data?.result ||
            data?.url ||
            data?.video ||
            data?.data?.url;

        if (!mediaUrl) {
            return await sock.sendMessage(chatId, {
                text: "❌ Veo3 failed to generate media."
            }, { quoted: message });
        }

        // Try sending as video first, fallback to image if needed
        if (mediaUrl.endsWith(".mp4")) {
            await sock.sendMessage(chatId, {
                video: { url: mediaUrl },
                caption: `🎬 *Veo3 AI Video*\n\n📝 Prompt: ${prompt}`
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, {
                image: { url: mediaUrl },
                caption: `🎬 *Veo3 AI Output*\n\n📝 Prompt: ${prompt}`
            }, { quoted: message });
        }

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Veo3 API."
        }, { quoted: message });
    }
};

module.exports = veo3Command;
