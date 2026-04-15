const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a search term"
            }, { quoted: message });
        }

        const query = args.join(" ");

        // 1️⃣ Try Gifted API first
        const api = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${encodeURIComponent(query)}`;

        const res = await axios.get(api);

        let data = res.data?.result || res.data;

        let title = data?.title || query;
        let desc = data?.extract || data?.description || data?.summary;

        // 2️⃣ Fallback to REAL Wikipedia if no description
        if (!desc) {
            const wiki = await axios.get(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
            );

            title = wiki.data?.title || title;
            desc = wiki.data?.extract;
        }

        // 3️⃣ Final fallback
        if (!desc) desc = "No description found from Wikipedia.";

        return sock.sendMessage(chatId, {
            text:
`📚 WIKIMEDIA RESULT

📖 Title: ${title}

📝 ${desc}`
        }, { quoted: message });

    } catch (e) {
        console.log("WIKI ERROR:", e);

        sock.sendMessage(chatId, {
            text: "❌ Error fetching Wikipedia data"
        }, { quoted: message });
    }
};
