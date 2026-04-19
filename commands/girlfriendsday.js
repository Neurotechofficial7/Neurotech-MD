const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/girlfriendsday?apikey=gifted');

        const reply = res.data.result || "💖 Happy Girlfriend’s Day!";

        await sock.sendMessage(chatId, {
            text: `💖 *Girlfriend's Day Message*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch Girlfriend’s Day message.'
        }, { quoted: message });
    }
};
