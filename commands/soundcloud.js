const axios = require("axios");

module.exports = {
    name: "soundcloud",

    async execute(sock, msg, args) {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Provide song name"
                }, { quoted: msg });
            }

            const query = encodeURIComponent(args.join(" "));

            const url = `https://api.giftedtech.co.ke/api/search/soundcloud?apikey=gifted&query=${query}`;

            const res = await axios.get(url);

            const data = res.data?.result;

            if (!data || !data.length) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No tracks found"
                }, { quoted: msg });
            }

            let text = "🎧 SOUNDCLOUD RESULTS\n\n";

            data.slice(0, 5).forEach((t, i) => {
                text += `${i + 1}. ${t.title}\n🔗 ${t.url}\n\n`;
            });

            sock.sendMessage(msg.key.remoteJid, {
                text
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
        }
    }
};
