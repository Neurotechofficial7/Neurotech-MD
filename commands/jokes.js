const axios = require("axios");

const jokesCommand = async (sock, chatId, message) => {
    try {

        const url = `https://api.giftedtech.co.ke/api/fun/jokes?apikey=gifted`;

        const res = await axios.get(url);

        const data = res.data;

        // Different APIs may return different keys
        const joke =
            data?.result ||
            data?.joke ||
            data?.data?.joke;

        if (!joke) {
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to fetch a joke."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "😂 *JOKE TIME*\n\n" + joke
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Jokes API."
        }, { quoted: message });
    }
};

module.exports = jokesCommand;
