const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const category = args[0] || "football";

        const url = `https://api.giftedtech.co.ke/api/sports/live?apikey=gifted&category=${category}`;

        const res = await axios.get(url);
        const data = res.data;

        // 🔥 SAFE EXTRACTION (fixes your error)
        const matches =
            data?.result ||
            data?.matches ||
            data?.data ||
            data?.events ||
            [];

        if (!matches || matches.length === 0) {
            return await sock.sendMessage(chatId, {
                text: `📭 No live ${category} matches found right now.`
            }, { quoted: message });
        }

        let text = `🔥 *LIVE MATCHES (${category.toUpperCase()})*\n\n`;

        matches.slice(0, 10).forEach((m, i) => {
            const home = m.home || m.team1 || m.team_home || "Team A";
            const away = m.away || m.team2 || m.team_away || "Team B";
            const league = m.league || m.competition || "N/A";
            const score = m.score || m.result || "Live";
            const status = m.status || "LIVE";

            text += `⚽ ${i + 1}. ${home} vs ${away}\n`;
            text += `🏆 League: ${league}\n`;
            text += `⏱ Score: ${score} (${status})\n\n`;
        });

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (err) {
        console.log("LIVE MATCH ERROR:", err?.response?.data || err.message);

        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch live matches. API error or network issue."
        }, { quoted: message });
    }
};
