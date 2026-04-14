const axios = require("axios");

const valentinesCommand = async (sock, chatId, message) => {
    try {

        const url = `https://api.giftedtech.co.ke/api/fun/valentines?apikey=gifted`;

        const res = await axios.get(url);

        const data = res.data;

        const love =
            data?.result ||
            data?.message ||
            data?.data?.message ||
            data?.valentine;

        if (!love) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch Valentine message."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "💖 *VALENTINE MESSAGE*\n\n" + love
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Valentine API."
        }, { quoted: message });
    }
};

module.exports = valentinesCommand;
