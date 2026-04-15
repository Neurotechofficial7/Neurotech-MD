const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide song name"
            }, { quoted: message });
        }

        const query = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/soundcloud?apikey=gifted&query=${query}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No tracks found"
            }, { quoted: message });
        }

        let text = "🎧 SOUNDCLOUD RESULTS\n\n";

        data.slice(0, 5).forEach((t, i) => {
            text += `${i + 1}. ${t.title}\n🔗 ${t.url}\n\n`;
        });

        sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
