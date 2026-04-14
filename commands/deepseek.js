const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const query = args.join(" ");

        if (!query) {
            return await sock.sendMessage(chatId, {
                text: "❌ Example: .deepseek Hello"
            }, { quoted: message });
        }

        // ✅ FREE proxy API (works on most panels)
        const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(query)}&botname=DREADED&ownername=Allamano`);

        const reply = response.data.message;

        await sock.sendMessage(chatId, {
            text: `🤖 *AI Response:*\n\n${reply}`
        }, { quoted: message });

    } catch (err) {
        console.error(err);

        await sock.sendMessage(chatId, {
            text: "❌ AI failed. Try again later."
        }, { quoted: message });
    }
};
