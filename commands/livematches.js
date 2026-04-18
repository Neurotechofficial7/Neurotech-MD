const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const category = args[0] || "football";

        const url = `676ljgIgnA7XWvluduIylBMzHM6JjHAATLC4142kr7p8s1CrwQp0jlZHu2Qx=${category}`;

        const res = await axios.get(url);

        console.log("🔥 STATUS:", res.status);
        console.log("🔥 DATA:", res.data);

        await sock.sendMessage(chatId, {
            text: "🔍 API RESPONSE:\n\n" + JSON.stringify(res.data, null, 2).slice(0, 3500)
        }, { quoted: message });

    } catch (err) {
        console.log("❌ FULL ERROR:", err?.response?.data || err.message);

        await sock.sendMessage(chatId, {
            text:
`❌ API FAILED

Reason:
${err?.response?.data?.message || err.message || "Unknown error"}`
        }, { quoted: message });
    }
};
