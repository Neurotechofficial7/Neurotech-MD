const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const category = args[0] || "football";

        const url = `https://api.giftedtech.co.ke/api/sports/all?apikey=gifted&category=${category}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.matches || data.matches.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "📭 No matches found."
            }, { quoted: message });
        }

        let text = `📊 *ALL MATCHES (${category.toUpperCase()})*\n\n`;

        data.matches.slice(0, 15).forEach((m, i) => {
            text += `⚽ ${i + 1}. ${m.home} vs ${m.away}\n`;
            text += `🏆 ${m.league || "Unknown League"}\n`;
            text += `📅 ${m.date || "TBA"}\n\n`;
        });

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch all matches."
        }, { quoted: message });
    }
};
