const axios = require("axios");

module.exports = {
  name: "magiceraser",
  description: "AI Magic Eraser - Remove objects from images",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const url = args[0];

      if (!url) {
        return sock.sendMessage(from, {
          text: "❌ Provide image URL\nExample: .magiceraser <url>"
        });
      }

      await sock.sendMessage(from, { text: "⏳ Removing object..." });

      const api = `https://api.giftedtech.co.ke/api/tools/magiceraser?apikey=gifted&url=${encodeURIComponent(url)}`;
      const res = await axios.get(api);

      const data = res.data;
      if (!data?.success) {
        return sock.sendMessage(from, { text: "❌ Failed to process image" });
      }

      await sock.sendMessage(from, {
        image: { url: data.result },
        caption: "✨ Object removed successfully"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error occurred" });
    }
  }
};
