const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: `❗ Usage: .ytvideo <youtube-url>`
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/ytvideo?apikey=gifted&url=${encodeURIComponent(url)}`;

        const res = await axios.get(api);

        const data = res.data;

        const video = data?.result?.download_url || data?.result?.url;

        if (!video) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to fetch video.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            video: { url: video },
            caption: '✅ Downloaded via NeuroTech Bot'
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Error downloading video.'
        }, { quoted: message });
    }
};
