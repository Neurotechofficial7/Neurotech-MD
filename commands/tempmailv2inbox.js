const axios = require("axios");

module.exports = {
  name: "tempmailv2inbox",
  description: "Get inbox messages for TEMP MAIL V2",
  category: "tools",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const email = args[0];

      if (!email) {
        return sock.sendMessage(from, {
          text: "❌ Usage:\n.tempmailv2inbox <email>\n\nExample:\n.tempmailv2inbox test@mail.com"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tempgen/v1/inbox?apikey=gifted&email=${encodeURIComponent(email)}`;

      await sock.sendMessage(from, {
        text: "📥 Checking TEMP MAIL V2 inbox..."
      });

      const response = await axios.get(api);
      const data = response.data;

      const messages =
        data?.messages ||
        data?.result?.messages ||
        data?.data?.messages;

      if (!messages || messages.length === 0) {
        return sock.sendMessage(from, {
          text: `📭 No messages found for:\n${email}`
        });
      }

      let inboxText = `📥 *TEMP MAIL V2 INBOX*\n\n📧 Email: ${email}\n\n`;

      messages.forEach((msg, i) => {
        inboxText += `📩 Message ${i + 1}\n`;
        inboxText += `From: ${msg.from || "Unknown"}\n`;
        inboxText += `Subject: ${msg.subject || "No Subject"}\n`;
        inboxText += `Message: ${msg.text || msg.body || "No content"}\n\n`;
      });

      await sock.sendMessage(from, {
        text: inboxText
      });

    } catch (err) {
      console.log("TempMailV2 Inbox Error:", err);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Failed to fetch inbox. Try again later."
      });
    }
  }
};
