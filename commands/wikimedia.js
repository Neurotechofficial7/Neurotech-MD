const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a search term"
            }, { quoted: message });
        }

        const title = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${title}`;

        const res = await axios.get(api);
        const data = res.data?.result;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No wiki results found"
            }, { quoted: message });
        }

        return sock.sendMessage(chatId, {
            text:
`📚 WIKIMEDIA

📖 Title: ${data.title}

📝 ${data.extract || "No info available"}`
        }, { quoted: message });

    } catch (e) {
        console.log(e);
    }
};
