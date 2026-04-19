const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/newyear?apikey=gifted');

        const reply = res.data.result || "🎉 Happy New Year! Wishing you success and joy!";

        await sock.sendMessage(chatId, {
            text: `🎉 *New Year Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch New Year message.'
        }, { quoted: message });
    }
};
