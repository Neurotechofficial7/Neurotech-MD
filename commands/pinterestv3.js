const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: '❗ Usage: .pinterestv3 <pinterest-link>'
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/pinterestv3?apikey=gifted&url=${encodeURIComponent(url)}`;

        const res = await axios.get(api);

        const data = res.data;

        const result = data?.result?.url || data?.result?.download_url;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to download Pinterest media.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            video: { url: result },
            caption: '📌 Pinterest Downloaded'
        }, { quoted: message });

    } catch (e) {
        console.log(e);
        sock.sendMessage(chatId, {
            text: '❌ Error downloading Pinterest media.'
        }, { quoted: message });
    }
};
