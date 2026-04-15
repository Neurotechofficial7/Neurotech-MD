const axios = require("axios");

module.exports = {
    name: "shazam",

    async execute(sock, msg, args) {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Provide a media URL"
                }, { quoted: msg });
            }

            const url = encodeURIComponent(args[0]);

            const api = `https://api.giftedtech.co.ke/api/search/shazam?apikey=gifted&url=${url}`;

            const res = await axios.get(api);

            const data = res.data?.result;

            if (!data) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No music found"
                }, { quoted: msg });
            }

            return sock.sendMessage(msg.key.remoteJid, {
                text:
`🎵 SHAZAM RESULT

🎶 Title: ${data.title}
👤 Artist: ${data.artist}
💿 Album: ${data.album || "N/A"}`
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Error identifying music"
            }, { quoted: msg });
        }
    }
};
