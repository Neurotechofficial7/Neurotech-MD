const axios = require('axios');

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: '❌ Example: .npm express'
            }, { quoted: message });
        }

        const pkg = args[0];
        const url = `https://api.giftedtech.co.ke/api/search/npmsearch?apikey=gifted&packagename=${encodeURIComponent(pkg)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.result) {
            return sock.sendMessage(chatId, {
                text: '❌ No package found.'
            }, { quoted: message });
        }

        const result = data.result;

        let text = `📦 *NPM PACKAGE*\n\n`;
        text += `📌 Name: ${result.name}\n`;
        text += `📝 Description: ${result.description || 'No description'}\n`;
        text += `🔢 Version: ${result.version}\n`;
        text += `🔗 Link: ${result.link}`;

        await sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: '❌ Error fetching npm package.'
        }, { quoted: message });
    }
};
