const axios = require("axios");

module.exports = {
  name: "tempemail",
  description: "Generate temporary email",

  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;

    try {
      // mode from user or default random
      const mode = args[0] || "random";

      await sock.sendMessage(chatId, {
        text: "📧 Generating temporary email..."
      }, { quoted: msg });

      const url = `https://api.giftedtech.co.ke/api/tempgen/v2/generate?apikey=gifted&mode=${mode}`;

      const response = await axios.get(url);
      console.log("EMAIL API:", response.data);

      const data = response.data;

      // handle different formats
      const email =
        data.email ||
        data.result?.email ||
        data.address ||
        data.result?.address;

      if (!email) {
        return sock.sendMessage(chatId, {
          text: "❌ Failed to generate email. Try again."
        }, { quoted: msg });
      }

      const text = `📧 *TEMP EMAIL GENERATED*

📨 Email: ${email}
⚙️ Mode: ${mode}

⏳ Expires in 10 minutes.
⚠️ Use it quickly!`;

      await sock.sendMessage(chatId, {
        text
      }, { quoted: msg });

    } catch (err) {
      console.log("TempEmail Error:", err.message);

      await sock.sendMessage(chatId, {
        text: "❌ Error generating email."
      }, { quoted: msg });
    }
  }
};
