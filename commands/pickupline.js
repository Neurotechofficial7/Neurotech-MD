const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/fun/pickupline?apikey=gifted');

        const reply = res.data.result || "😉 Are you WiFi? Because I'm feeling a connection.";

        await sock.sendMessage(chatId, {
            text: `😉 *Pickup Line*\n\n${reply}`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch pickup line.'
        }, { quoted: message });
    }
};
