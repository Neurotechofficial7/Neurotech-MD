const axios = require("axios");

const adviceCommand = async (sock, chatId, message) => {
    try {

        const url = `https://api.giftedtech.co.ke/api/fun/advice?apikey=gifted`;

        const res = await axios.get(url);

        const data = res.data;

        const advice =
            data?.result ||
            data?.advice ||
            data?.data?.advice;

        if (!advice) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch advice."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "💡 *DAILY ADVICE*\n\n" + advice
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Advice API."
        }, { quoted: message });
    }
};

module.exports = adviceCommand;
