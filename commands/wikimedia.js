const axios = require("axios");

module.exports = {
    name: "wikimedia",

    async execute(sock, msg, args) {
        try {
            if (!args[0]) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Provide a search term"
                }, { quoted: msg });
            }

            const title = encodeURIComponent(args.join(" "));

            const url = `https://api.giftedtech.co.ke/api/search/wikimedia?apikey=gifted&title=${title}`;

            const res = await axios.get(url);

            const data = res.data?.result;

            if (!data) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No wiki result found"
                }, { quoted: msg });
            }

            return sock.sendMessage(msg.key.remoteJid, {
                text:
`📚 WIKIPEDIA RESULT

📖 Title: ${data.title}

📝 ${data.extract || "No description"}`
            }, { quoted: msg });

        } catch (e) {
            console.log(e);
            msg.reply("❌ Error fetching wiki");
        }
    }
};
