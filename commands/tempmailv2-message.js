const axios = require("axios");

module.exports = {
  name: "tempmailv2-message",
  description: "Get specific email message content (Tempmail V2)",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const email = args[0];
    const messageid = args[1];

    if (!email || !messageid) {
      return sock.sendMessage(from, {
        text: "❌ Usage:\n.tempmailv2message <email> <messageid>\n\nExample:\n.tempmailv2message test@mail.com 12345"
      }, { quoted: msg });
    }

    try {
      const api = `https://api.giftedtech.co.ke/api/tempgen/v1/message?apikey=gifted&email=${encodeURIComponent(email)}&messageid=${encodeURIComponent(messageid)}`;

      const res = await axios.get(api);
      const data = res.data;

      if (!data || !data.message) {
        return sock.sendMessage(from, {
          text: "❌ Message not found or expired."
        }, { quoted: msg });
      }

      await sock.sendMessage(from, {
        text: `📩 *TEMPMAIL MESSAGE*\n\n📧 Email: ${email}\n🆔 ID: ${messageid}\n\n💬 Content:\n${data.message}`
      }, { quoted: msg });

    } catch (err) {
      console.log(err);
      await sock.sendMessage(from, {
        text: "❌ Error fetching message content."
      }, { quoted: msg });
    }
  }
};
