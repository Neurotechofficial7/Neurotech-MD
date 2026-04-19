const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/love?apikey=gifted');

        const reply = res.data.result || "❤️ Love is a beautiful thing!";

        await sock.sendMessage(chatId, {
            text: `❤️ *Love Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch love message.'
        }, { quoted: message });
    }
};
