const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const id = args.join(" ");

        if (!id) {
            return await sock.sendMessage(chatId, {
                text: "❗ Usage: .stream <match-id>"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/sports/stream?apikey=gifted&source=echo&id=${encodeURIComponent(id)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.streams || data.streams.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "📭 No stream links found for this match."
            }, { quoted: message });
        }

        let text = `📺 *STREAM LINKS*\n\n`;

        data.streams.forEach((s, i) => {
            text += `🔗 ${i + 1}. ${s.name || "Stream"}\n`;
            text += `${s.url}\n\n`;
        });

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch stream links."
        }, { quoted: message });
    }
};
