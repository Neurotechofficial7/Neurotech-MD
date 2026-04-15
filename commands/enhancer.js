const axios = require("axios");

module.exports = {
  name: "enhance",
  description: "AI Image Enhancer",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const url = args[0];

      if (!url) {
        return sock.sendMessage(from, {
          text: "❌ Provide image URL\nExample: .enhance <url>"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/imageenhancer?apikey=gifted&url=${encodeURIComponent(url)}`;

      await sock.sendMessage(from, { text: "⏳ Enhancing image quality..." });

      const res = await axios.get(api);

      if (!res.data?.success) {
        return sock.sendMessage(from, { text: "❌ Failed" });
      }

      await sock.sendMessage(from, {
        image: { url: res.data.result },
        caption: "✨ Image enhanced successfully"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
