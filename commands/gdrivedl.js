const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: '❗ Usage: .gdrivedl <google-drive-link>'
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/gdrivedl?apikey=gifted&url=${encodeURIComponent(url)}`;

        const res = await axios.get(api);

        const data = res.data;

        const result = data?.result?.download_url || data?.result?.url;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to download Google Drive file.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            document: { url: result },
            fileName: 'gdrive-file',
            mimetype: 'application/octet-stream'
        }, { quoted: message });

    } catch (e) {
        console.log(e);
        sock.sendMessage(chatId, {
            text: '❌ Error downloading Google Drive file.'
        }, { quoted: message });
    }
};
