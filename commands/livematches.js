const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {

        // 🔑 PUT YOUR NEW API KEY HERE
        const apikey = "676ljgIgnA7XWvluduIylBMzHM6JjHAATLC4142kr7p8s1CrwQp0jlZHu2Qx";

        const url = `https://api.giftedtech.co.ke/api/sports/live?apikey=${apikey}&category=football`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || data.error || data.status === false) {
            return sock.sendMessage(chatId, {
                text: "❌ API FAILED\nReason: No live matches or invalid response."
            }, { quoted: message });
        }

        let output = "⚽ *LIVE MATCHES*\n\n";

        if (Array.isArray(data.result)) {
            data.result.forEach((match, i) => {
                output += `*${i + 1}.* ${match.home} vs ${match.away}\n`;
                output += `🏆 League: ${match.league || "Unknown"}\n`;
                output += `⏰ Time: ${match.time || "Live"}\n\n`;
            });
        } else {
            output += JSON.stringify(data, null, 2);
        }

        await sock.sendMessage(chatId, {
            text: output
        }, { quoted: message });

    } catch (err) {
        console.log("Live Matches Error:", err.message);

        await sock.sendMessage(chatId, {
            text: "❌ API FAILED\nReason: Invalid URL or network error."
        }, { quoted: message });
    }
};
