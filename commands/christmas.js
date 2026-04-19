const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/christmas?apikey=gifted');

        const reply = res.data.result || "🎄 Merry Christmas! Wishing you joy and peace!";

        await sock.sendMessage(chatId, {
            text: `🎄 *Christmas Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch Christmas message.'
        }, { quoted: message });
    }
};
