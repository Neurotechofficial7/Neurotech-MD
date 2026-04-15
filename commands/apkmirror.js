const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide app name"
            }, { quoted: message });
        }

        const query = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/apkmirror?apikey=gifted&query=${query}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No results found"
            }, { quoted: message });
        }

        let text = "📦 APKMIRROR RESULTS\n\n";

        data.slice(0, 5).forEach((app, i) => {
            text += `${i + 1}. ${app.name}\n🔗 ${app.url}\n\n`;
        });

        sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
