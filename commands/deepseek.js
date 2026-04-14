const axios = require("axios");

module.exports = async (sock, chatId, message, args) => {
    try {
        const query = args.join(" ");

        if (!query) {
            return await sock.sendMessage(chatId, {
                text: "❌ Example: .deepseek Hello, how are you?"
            }, { quoted: message });
        }

        // 🔑 Replace with your DeepSeek API key
        const API_KEY = "sk-85715a5795384bb2984f8b0d51a66775";

        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a helpful AI assistant." },
                    { role: "user", content: query }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const reply = response.data.choices[0].message.content;

        await sock.sendMessage(chatId, {
            text: `🤖 *DeepSeek AI:*\n\n${reply}`
        }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: "❌ Error connecting to DeepSeek AI."
        }, { quoted: message });
    }
};
