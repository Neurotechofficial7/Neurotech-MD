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

        console.log("WIKI RESPONSE:", res.data); // 🔥 DEBUG

        const data =
            res.data?.result ||
            res.data?.data ||
            res.data?.query ||
            res.data;

        if (!data) {
            return sock.sendMessage(chatId, {
                text: "❌ No wiki results found (API returned empty or different format)"
            }, { quoted: message });
        }

        // Try multiple formats safely
        const title = data.title || data.name || "Wikipedia Result";
        const extract = data.extract || data.description || data.summary || "No description found";

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
