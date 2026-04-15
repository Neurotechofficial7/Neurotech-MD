const axios = require("axios");

module.exports = {
  name: "vocalv2",
  description: "AI Vocal Remover V2 - Separate vocals from instrumentals (YouTube, TikTok, URLs)",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const url = args[0];

      if (!url) {
        return await sock.sendMessage(from, {
          text: `❌ Please provide a valid media URL.\n\n📌 Example:\n.vocalv2 https://youtube.com/watch?v=xxxx`
        });
      }

      await sock.sendMessage(from, {
        text: "⏳ Processing audio... separating vocals and instrumental, please wait..."
      });

      const api = `https://api.giftedtech.co.ke/api/tools/vocalremoverv2?apikey=gifted&url=${encodeURIComponent(url)}`;

      const response = await axios.get(api);
      const data = response.data;

      if (!data || !data.success) {
        return await sock.sendMessage(from, {
          text: "❌ Failed to process audio. Please try another link."
        });
      }

      const { vocal, instrumental } = data.result;

      // Send vocal track
      await sock.sendMessage(from, {
        audio: { url: vocal },
        mimetype: "audio/mpeg",
        fileName: "vocal.mp3"
      });

      // Send instrumental track
      await sock.sendMessage(from, {
        audio: { url: instrumental },
        mimetype: "audio/mpeg",
        fileName: "instrumental.mp3"
      });

      await sock.sendMessage(from, {
        text: "✅ Vocal separation complete! 🎶"
      });

    } catch (err) {
      console.error("VocalV2 Error:", err);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Error processing request. Try again later."
      });
    }
  }
};
