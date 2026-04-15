const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide app name"
            }, { quoted: message });
        }

        const query = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/playstore?apikey=gifted&query=${query}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No apps found"
            }, { quoted: message });
        }

        let text = "📱 PLAYSTORE RESULTS\n\n";

        data.slice(0, 5).forEach((app, i) => {
            text += `${i + 1}. ${app.name}\n⭐ ${app.rating || "N/A"}\n🔗 ${app.url}\n\n`;
        });

        sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
