const axios = require('axios');

module.exports = async (sock, chatId, message) => {
    try {
        const res = await axios.get('https://api.giftedtech.co.ke/api/anime/random?apikey=gifted');

        const data = res.data.result || res.data;

        await sock.sendMessage(chatId, {
            image: { url: data },
            caption: "🎲 *Random Anime*"
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch random anime image."
        }, { quoted: message });
    }
};
