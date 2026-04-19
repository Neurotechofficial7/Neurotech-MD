const axios = require("axios");

module.exports = {
  name: "ssphone",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const url = args[0];

    if (!url) return sock.sendMessage(from, { text: "Usage: .ssphone <url>" });

    const api = `https://api.giftedtech.co.ke/api/tools/ssphone?apikey=gifted&url=${encodeURIComponent(url)}`;

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      image: { url: res.data.result },
      caption: "📱 Mobile Screenshot"
    });
  }
};
