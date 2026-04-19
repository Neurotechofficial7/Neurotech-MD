const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        const url = args[0];
        const quality = args[1] || '128kbps';

        if (!url) {
            return sock.sendMessage(chatId, {
                text: `❗ Usage: .ytmp3 <youtube-url> <96kbps|128kbps|256kbps|320kbps>`
            }, { quoted: message });
        }

        const api = `https://api.giftedtech.co.ke/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(url)}&quality=${quality}`;

        const res = await axios.get(api);

        const data = res.data;

        const audio = data?.result?.download_url || data?.result?.url;

        if (!audio) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to fetch MP3.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            audio: { url: audio },
            mimetype: 'audio/mp4',
            fileName: 'NeuroTech-MP3.mp3'
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Error downloading MP3.'
        }, { quoted: message });
    }
};
