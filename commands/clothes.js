const axios = require("axios");

module.exports = {
  name: "clothes",
  description: "AI clothes remover",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const url = args[0];

      if (!url) {
        return sock.sendMessage(from, {
          text: "❌ Provide image URL"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/rc?apikey=gifted&url=${encodeURIComponent(url)}&prompt=remove+clothes`;

      await sock.sendMessage(from, { text: "⏳ Processing image..." });

      const res = await axios.get(api);

      await sock.sendMessage(from, {
        image: { url: res.data.result },
        caption: "✅ Done"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
