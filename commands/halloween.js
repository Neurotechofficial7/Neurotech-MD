const axios = require("axios");

const halloweenCommand = async (sock, chatId, message) => {
    try {

        const url = `https://api.giftedtech.co.ke/api/fun/halloween?apikey=gifted`;

        const res = await axios.get(url);

        const data = res.data;

        const spooky =
            data?.result ||
            data?.message ||
            data?.data?.message ||
            data?.halloween;

        if (!spooky) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch Halloween message."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "🎃 *HALLOWEEN MESSAGE*\n\n" + spooky
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Halloween API."
        }, { quoted: message });
    }
};

module.exports = halloweenCommand;
