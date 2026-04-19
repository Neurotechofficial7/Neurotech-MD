const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const url = "https://api.giftedtech.co.ke/checkapikey?apikey=gifted";

        const res = await axios.get(url);
        const data = res.data;

        if (!data) {
            return await sock.sendMessage(chatId, {
                text: '❌ Failed to check API key.'
            }, { quoted: message });
        }

        // Fix undefined message
        const apiMessage = data.message || "No message provided";

        let msg = `🔑 *API KEY STATUS*\n\n`;
        msg += `📌 Status: ${data.status || 'N/A'}\n`;
        msg += `✅ Success: ${data.success}\n`;
        msg += `👑 Owner: Neurotech\n`;
        msg += `💬 Message: ${apiMessage}\n`;

        await sock.sendMessage(chatId, { text: msg }, { quoted: message });

    } catch (error) {
        console.error('API CHECK ERROR:', error.message);

        await sock.sendMessage(chatId, {
            text: '❌ Error checking API key.'
        }, { quoted: message });
    }
};
