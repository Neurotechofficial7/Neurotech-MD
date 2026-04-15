const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a search term"
            }, { quoted: message });
        }

        const query = encodeURIComponent(args.join(" "));

        const api = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${query}`;

        const res = await axios.get(api);

        console.log("WIKI RAW RESPONSE:", JSON.stringify(res.data, null, 2));

        const result =
            res.data?.result ||
            res.data?.data ||
            res.data;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: "❌ No wiki results found"
            }, { quoted: message });
        }

        const title =
            result.title ||
            result.name ||
            result.page ||
            query.replace(/\+/g, " ");

        const extract =
            result.extract ||
            result.description ||
            result.snippet ||
            result.summary ||
            "No description available";

        return sock.sendMessage(chatId, {
            text:
`📚 WIKIMEDIA RESULT

📖 Title: ${title}

📝 ${extract}`
        }, { quoted: message });

    } catch (e) {
        console.log("WIKI ERROR:", e);

        sock.sendMessage(chatId, {
            text: "❌ Error fetching wiki data"
        }, { quoted: message });
    }
};
