const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/gratitude?apikey=gifted');

        const reply = res.data.result || "🙏 Stay grateful always!";

        await sock.sendMessage(chatId, {
            text: `🙏 *Gratitude Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch gratitude message.'
        }, { quoted: message });
    }
};
