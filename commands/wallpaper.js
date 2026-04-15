const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide keyword"
            }, { quoted: message });
        }

        const query = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/wallpaper?apikey=gifted&query=${query}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No wallpapers found"
            }, { quoted: message });
        }

        let text = "🖼️ WALLPAPERS\n\n";

        data.slice(0, 5).forEach((img, i) => {
            text += `${i + 1}. ${img.url}\n\n`;
        });

        sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
