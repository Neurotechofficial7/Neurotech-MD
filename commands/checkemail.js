const axios = require("axios");

module.exports = {
  name: "checkemail",
  description: "Check inbox messages for temp email",

  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;

    try {
      const email = args.join("").trim();

      if (!email) {
        return sock.sendMessage(chatId, {
          text: "❗ Example: .checkemail example@mail.com"
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: "📥 Checking email inbox..."
      }, { quoted: msg });

      const url = `https://api.giftedtech.co.ke/api/tempgen/v2/inbox?apikey=gifted&email=${encodeURIComponent(email)}`;

      const response = await axios.get(url);
      console.log("EMAIL INBOX:", response.data);

      const data = response.data;

      const messages =
        data.messages ||
        data.result?.messages ||
        data.result ||
        [];

      if (!messages || messages.length === 0) {
        return sock.sendMessage(chatId, {
          text: "📭 No emails found."
        }, { quoted: msg });
      }

      let text = `📩 *EMAIL INBOX*\n\n📨 Email: ${email}\n\n`;

      messages.slice(0, 5).forEach((mail, i) => {
        text += `📧 Email ${i + 1}\n`;
        text += `From: ${mail.from || "Unknown"}\n`;
        text += `Subject: ${mail.subject || "No subject"}\n`;
        text += `Message: ${mail.text || mail.body || "No content"}\n\n`;
      });

      await sock.sendMessage(chatId, {
        text
      }, { quoted: msg });

    } catch (err) {
      console.log("CheckEmail Error:", err.message);

      await sock.sendMessage(chatId, {
        text: "❌ Failed to fetch email inbox."
      }, { quoted: msg });
    }
  }
};
