const axios = require("axios");

const thankYouCommand = async (sock, chatId, message) => {
    try {

        const url = `https://api.giftedtech.co.ke/api/fun/thankyou?apikey=gifted`;

        const res = await axios.get(url);

        const data = res.data;

        const thanks =
            data?.result ||
            data?.message ||
            data?.data?.message ||
            data?.thankyou;

        if (!thanks) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch thank you message."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "🙏 *THANK YOU MESSAGE*\n\n" + thanks
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Thank You API."
        }, { quoted: message });
    }
};

module.exports = thankYouCommand;
