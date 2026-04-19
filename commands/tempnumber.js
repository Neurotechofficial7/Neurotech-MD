const axios = require("axios");

module.exports = {
  name: "tempnumber",
  description: "Generate a temporary phone number",
  async execute(sock, msg, args) {
    try {
      const chatId = msg.key.remoteJid;

      await sock.sendMessage(chatId, {
        text: "⏳ Generating temporary number, please wait..."
      });

      const url = "https://api.giftedtech.co.ke/api/tempgen/sms/generate?apikey=gifted&country=random";

      const response = await axios.get(url);

      if (!response.data || !response.data.number) {
        return sock.sendMessage(chatId, {
          text: "❌ Failed to generate temporary number. Try again later."
        });
      }

      const data = response.data;

      const resultText = `
📱 *TEMP NUMBER GENERATED*

🌍 Country: ${data.country || "Unknown"}
📞 Number: ${data.number || "N/A"}
🆔 ID: ${data.id || "N/A"}

⚠️ Use this number quickly before it expires.
`;

      await sock.sendMessage(chatId, { text: resultText });

    } catch (error) {
      console.error(error);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Error connecting to temp number service. Try again later."
      });
    }
  }
};
