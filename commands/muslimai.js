const axios = require("axios");

const muslimAICommand = async (sock, chatId, message) => {
    try {

        const body =
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            "";

        const q = body.split(" ").slice(1).join(" ");

        if (!q) {
            return await sock.sendMessage(chatId, {
                text: "❗ Example:\n.muslimai What does Islam say about patience?"
            }, { quoted: message });
        }

        const url = `https://api.giftedtech.co.ke/api/ai/muslimai?apikey=gifted&q=${encodeURIComponent(q)}`;

        const res = await axios.get(url);

        const data = res.data;

        const result = data?.result;

        if (!result) {
            return await sock.sendMessage(chatId, {
                text: "❌ Muslim AI failed to respond."
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            text: "🕌 *Muslim AI:*\n\n" + result
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "⚠️ Error connecting to Muslim AI API."
        }, { quoted: message });
    }
};

module.exports = muslimAICommand;
