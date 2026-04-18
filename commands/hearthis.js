const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: '❌ Example: .hearthis https://hearthis.at/...'
            }, { quoted: message });
        }

        const urlInput = args[0];
        const url = `https://api.giftedtech.co.ke/api/search/hearthisset?apikey=gifted&url=${encodeURIComponent(urlInput)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.result) {
            return sock.sendMessage(chatId, {
                text: '❌ No tracks found.'
            }, { quoted: message });
        }

        let text = `🎧 *HEARTHIS SET*\n\n`;

        data.result.slice(0, 5).forEach((track, i) => {
            text += `${i + 1}. ${track.title}\n🔗 ${track.url}\n\n`;
        });

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: '❌ Error fetching tracks.'
        }, { quoted: message });
    }
};
