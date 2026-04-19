const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a music/audio URL"
            }, { quoted: message });
        }

        const url = encodeURIComponent(args[0]);

        const api = `https://api.giftedtech.co.ke/api/search/shazam?apikey=gifted&url=${url}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No music found"
            }, { quoted: message });
        }

        return sock.sendMessage(chatId, {
            text:
`🎵 SHAZAM RESULT

🎶 Title: ${data.title}
👤 Artist: ${data.artist}
💿 Album: ${data.album || "N/A"}`
        }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
