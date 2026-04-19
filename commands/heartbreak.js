const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/heartbreak?apikey=gifted');

        const reply = res.data.result || "💔 Heartbreak happens, but you will heal.";

        await sock.sendMessage(chatId, {
            text: `💔 *Heartbreak Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch heartbreak message.'
        }, { quoted: message });
    }
};
