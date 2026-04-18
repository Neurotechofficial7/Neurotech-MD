const axios = require("axios");

module.exports = async (sock, chatId, message) => {
    try {
        const url = `https://api.giftedtech.co.ke/api/sports/categories?apikey=gifted`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.categories || data.categories.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "📭 No categories found."
            }, { quoted: message });
        }

        let text = `🏆 *SPORTS CATEGORIES*\n\n`;

        data.categories.forEach((c, i) => {
            text += `📌 ${i + 1}. ${c.name}\n`;
        });

        await sock.sendMessage(chatId, {
            text
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to fetch categories."
        }, { quoted: message });
    }
};
