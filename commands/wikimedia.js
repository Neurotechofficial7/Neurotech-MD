const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a search term"
            }, { quoted: message });
        }

        const query = args.join(" ");

        const api = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${encodeURIComponent(query)}`;

        const res = await axios.get(api);

        let result = res.data?.result || res.data;

        let title = result?.title || query;

        let desc =
            result?.extract ||
            result?.description ||
            result?.summary;

        // 🔥 IF API FAILS TO GIVE DESCRIPTION → FALLBACK
        if (!desc) {
            try {
                const wiki = await axios.get(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
                );

                desc = wiki.data?.extract;
                title = wiki.data?.title || title;

            } catch (e) {
                desc = "No description available";
            }
        }

        return sock.sendMessage(chatId, {
            text:
`📚 WIKIMEDIA RESULT

📖 Title: ${title}

📝 ${desc}`
        }, { quoted: message });

    } catch (e) {
        console.log("WIKI ERROR:", e);

        sock.sendMessage(chatId, {
            text: "❌ Error fetching wiki data"
        }, { quoted: message });
    }
};
