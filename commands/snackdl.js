const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: '❗ Usage: .snackdl <snack-video-url>'
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/snackdl?apikey=gifted&url=${encodeURIComponent(url)}`;

        const res = await axios.get(api);

        const data = res.data;

        const result = data?.result?.url || data?.result?.download_url;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to download Snack video.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            video: { url: result },
            caption: '📥 Snack Video Downloaded'
        }, { quoted: message });

    } catch (e) {
        console.log(e);
        sock.sendMessage(chatId, {
            text: '❌ Error downloading Snack video.'
        }, { quoted: message });
    }
};
