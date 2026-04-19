const axios = require("axios");

module.exports = {
  name: "canvas",
  description: "Generate canvas cards",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const type = args[0];
      const title = args.slice(1).join("+");

      if (!type || !title) {
        return sock.sendMessage(from, {
          text: "❌ Usage: .canvas <type> <title>\nExample: .canvas spotify Blinding+Lights"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/canvas?apikey=gifted&title=${title}&type=${type}&text=Generated&watermark=GIFTED`;

      await sock.sendMessage(from, { text: "⏳ Creating canvas..." });

      const res = await axios.get(api);

      await sock.sendMessage(from, {
        image: { url: res.data.result },
        caption: "🎨 Canvas generated"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
