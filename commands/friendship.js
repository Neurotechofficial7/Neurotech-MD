const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/friendship?apikey=gifted');

        const reply = res.data.result || "🤝 True friendship is priceless!";

        await sock.sendMessage(chatId, {
            text: `🤝 *Friendship Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch friendship message.'
        }, { quoted: message });
    }
};
