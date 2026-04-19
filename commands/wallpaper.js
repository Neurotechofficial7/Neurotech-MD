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

        console.log("WALLPAPER API RESPONSE:", res.data); // 🔥 IMPORTANT DEBUG

        const data =
            res.data?.result ||
            res.data?.results ||
            res.data?.data ||
            res.data;

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return sock.sendMessage(chatId, {
                text: "❌ No wallpapers found (API empty or changed format)"
            }, { quoted: message });
        }

        let list = Array.isArray(data) ? data : [];

        let text = "🖼️ WALLPAPER RESULTS\n\n";

        list.slice(0, 5).forEach((img, i) => {
            text += `${i + 1}. ${img.url || img.image || img.link}\n\n`;
        });

        sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (e) {
        console.log("WALLPAPER ERROR:", e);

        sock.sendMessage(chatId, {
            text: "❌ Error fetching wallpapers"
        }, { quoted: message });
    }
};
