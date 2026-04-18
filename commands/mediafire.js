const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: '❗ Usage: .mediafire <mediafire-link>'
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/mediafire?apikey=gifted&url=${encodeURIComponent(url)}`;

        const res = await axios.get(api);

        const data = res.data;

        const result = data?.result?.download_url || data?.result?.url;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to download file.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            document: { url: result },
            fileName: 'mediafire-file',
            mimetype: 'application/octet-stream'
        }, { quoted: message });

    } catch (e) {
        console.log(e);
        sock.sendMessage(chatId, {
            text: '❌ Error downloading file.'
        }, { quoted: message });
    }
};
