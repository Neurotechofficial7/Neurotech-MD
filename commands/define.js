const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: '❌ Example: .define dog'
            }, { quoted: message });
        }

        const word = args.join(' ');
        const url = `https://api.giftedtech.co.ke/api/search/define?apikey=gifted&term=${encodeURIComponent(word)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.result) {
            return sock.sendMessage(chatId, {
                text: '❌ No definition found.'
            }, { quoted: message });
        }

        const result = data.result;

        let text = `📖 *DEFINITION*\n\n`;
        text += `🔤 Word: ${word}\n\n`;
        text += `📝 Meaning: ${result.definition || 'No meaning found'}\n`;
        text += `📌 Example: ${result.example || 'No example available'}`;

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: '❌ Error fetching definition.'
        }, { quoted: message });
    }
};
