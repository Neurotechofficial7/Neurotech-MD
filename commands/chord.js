const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: '❌ Example: .chord spectre'
            }, { quoted: message });
        }

        const query = args.join(' ');
        const url = `https://api.giftedtech.co.ke/api/search/chord?apikey=gifted&query=${encodeURIComponent(query)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.result) {
            return sock.sendMessage(chatId, {
                text: '❌ No chord found.'
            }, { quoted: message });
        }

        const result = data.result;

        let text = `🎸 *CHORD RESULT*\n\n`;
        text += `🎵 Title: ${result.title || 'Unknown'}\n`;
        text += `👤 Artist: ${result.artist || 'Unknown'}\n`;
        text += `🔗 Link: ${result.url || 'No link'}`;

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: '❌ Error fetching chord.'
        }, { quoted: message });
    }
};
