const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/fathersday?apikey=gifted');

        const reply = res.data.result || "👨‍👧‍👦 Happy Father’s Day!";

        await sock.sendMessage(chatId, {
            text: `👨‍👧‍👦 *Father's Day Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch Father’s Day message.'
        }, { quoted: message });
    }
};
