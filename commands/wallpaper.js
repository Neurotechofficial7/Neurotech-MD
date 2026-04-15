const axios = require("axios");

module.exports = {
    name: "wallpaper",

    async execute(sock, msg, args) {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Provide keyword"
                }, { quoted: msg });
            }

            const query = encodeURIComponent(args.join(" "));

            const url = `https://api.giftedtech.co.ke/api/search/wallpaper?apikey=gifted&query=${query}`;

            const res = await axios.get(url);

            const data = res.data?.result;

            if (!data) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No wallpapers found"
                }, { quoted: msg });
            }

            let text = "🖼️ WALLPAPERS\n\n";

            data.slice(0, 5).forEach((img, i) => {
                text += `${i + 1}. ${img.url}\n\n`;
            });

            sock.sendMessage(msg.key.remoteJid, {
                text
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
        }
    }
};
