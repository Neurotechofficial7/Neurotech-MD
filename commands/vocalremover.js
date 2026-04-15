const axios = require("axios");

module.exports = {
  name: "vocal",
  description: "Separate vocals from instrumentals (AI Vocal Remover V2)",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      // Get URL input
      const url = args[0];

      if (!url) {
        return await sock.sendMessage(from, {
          text: "❌ Please provide a valid audio/video URL.\n\nExample:\n.vocal https://example.com/audio.mp3"
        });
      }

      // API endpoint
      const api = `https://api.giftedtech.co.ke/api/tools/vocalremoverv2?apikey=gifted&url=${encodeURIComponent(url)}`;

      await sock.sendMessage(from, {
        text: "⏳ Processing... Separating vocals from instrumental. Please wait..."
      });

      // Request API
      const response = await axios.get(api);
      const data = response.data;

      if (!data.success) {
        return await sock.sendMessage(from, {
          text: "❌ Failed to process audio. Try another link."
        });
      }

      const vocal = data.result.vocal;
      const instrumental = data.result.instrumental;

      // Send Vocal track
      await sock.sendMessage(from, {
        audio: { url: vocal },
        mimetype: "audio/mpeg",
        fileName: "vocal.mp3"
      });

      // Send Instrumental track
      await sock.sendMessage(from, {
        audio: { url: instrumental },
        mimetype: "audio/mpeg",
        fileName: "instrumental.mp3"
      });

      await sock.sendMessage(from, {
        text: "✅ Done! Here are your separated tracks 🎶"
      });

    } catch (err) {
      console.error(err);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Error processing request. Make sure the link is valid and try again."
      });
    }
  }
};
