const axios = require("axios");

module.exports = {
  name: "songgen",
  description: "AI Song Generator",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const prompt = args.join(" ");

      if (!prompt) {
        return sock.sendMessage(from, {
          text: "❌ Usage: .songgen a love song about stars"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/songgenerator?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;

      await sock.sendMessage(from, { text: "🎶 Generating song..." });

      const res = await axios.get(api);

      await sock.sendMessage(from, {
        audio: { url: res.data.result },
        mimetype: "audio/mpeg"
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
