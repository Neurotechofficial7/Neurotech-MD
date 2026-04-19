const axios = require("axios");

module.exports = {
  name: "upscale",
  description: "AI Image Upscaler",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const url = args[0];
      const model = args[1] || "upscale";

      if (!url) {
        return sock.sendMessage(from, {
          text: "❌ Usage: .upscale <url> <model>\nModels: upscale, unblur, enhance, portrait, text_enhance, old_photo"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/imageupscaler?apikey=gifted&url=${encodeURIComponent(url)}&model=${model}`;

      await sock.sendMessage(from, { text: "⏳ Enhancing image..." });

      const res = await axios.get(api);
      const data = res.data;

      if (!data?.success) {
        return sock.sendMessage(from, { text: "❌ Failed to upscale image" });
      }

      await sock.sendMessage(from, {
        image: { url: data.result },
        caption: "✅ Image enhanced"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
