const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: "❌ Provide a search term"
            }, { quoted: message });
        }

        const query = args.join(" ");

        // 🔥 STEP 1: try Gifted API
        let title = query;
        let desc = null;

        try {
            const api = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${encodeURIComponent(query)}`;
            const res = await axios.get(api);

            const data = res.data?.result || res.data;

            title = data?.title || query;
            desc = data?.extract || data?.description || data?.summary;

        } catch (e) {
            console.log("Gifted API failed:", e.message);
        }

        // 🔥 STEP 2: FIX WIKIPEDIA FALLBACK (IMPORTANT)
        if (!desc) {
            try {
                const wikiTitle = query.replace(/ /g, "_");

                const wiki = await axios.get(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`
                );

                title = wiki.data?.title || title;
                desc = wiki.data?.extract;

            } catch (e) {
                console.log("Wikipedia fallback failed:", e.message);
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
        console.log("FULL WIKI ERROR:", e);

        sock.sendMessage(chatId, {
            text: "❌ Error fetching Wikipedia data"
        }, { quoted: message });
    }
};
