const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/boyfriendsday?apikey=gifted');

        const reply = res.data.result || "💙 Happy Boyfriend’s Day!";

        await sock.sendMessage(chatId, {
            text: `💙 *Boyfriend's Day Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch Boyfriend’s Day message.'
        }, { quoted: message });
    }
};
