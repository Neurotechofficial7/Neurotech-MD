const axios = require("axios");

module.exports = {
    name: "apkmirror",

    async execute(sock, msg, args) {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Provide app name"
                }, { quoted: msg });
            }

            const query = encodeURIComponent(args.join(" "));

            const url = `https://api.giftedtech.co.ke/api/search/apkmirror?apikey=gifted&query=${query}`;

            const res = await axios.get(url);

            const data = res.data?.result;

            if (!data) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No results found"
                }, { quoted: msg });
            }

            let text = "📦 APKMIRROR RESULTS\n\n";

            data.slice(0, 5).forEach((app, i) => {
                text += `${i + 1}. ${app.name}\n🔗 ${app.url}\n\n`;
            });

            sock.sendMessage(msg.key.remoteJid, {
                text
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
        }
    }
};
