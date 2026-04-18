const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const category = args[0] || "football";

        const url = `https://api.giftedtech.co.ke/api/sports/live?apikey=gifted&category=${category}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.matches || data.matches.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "📭 No live matches found right now."
            }, { quoted: message });
        }

        let text = `🔥 *LIVE MATCHES (${category.toUpperCase()})*\n\n`;

        data.matches.forEach((m, i) => {
            text += `⚽ ${i + 1}. ${m.home} vs ${m.away}\n`;
            text += `🏆 League: ${m.league || "N/A"}\n`;
            text += `⏱ Score: ${m.score || "0-0"}\n`;
            text += `📡 Status: ${m.status || "Live"}\n\n`;
        });

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch live matches."
        }, { quoted: message });
    }
};
