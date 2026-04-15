const axios = require("axios");

module.exports = {
  name: "noiseremover",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const url = args[0];

    if (!url) return sock.sendMessage(from, { text: "Usage: .noiseremover <audio_url>" });

    const api = `https://api.giftedtech.co.ke/api/tools/noiseremover?apikey=gifted&url=${encodeURIComponent(url)}`;

    await sock.sendMessage(from, { text: "⏳ Removing noise..." });

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      audio: { url: res.data.result },
      mimetype: "audio/mpeg"
    });
  }
};
