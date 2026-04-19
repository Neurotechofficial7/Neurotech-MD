const axios = require("axios");

module.exports = {
  name: "carbon",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const code = args.join(" ");

    if (!code) return sock.sendMessage(from, { text: "Usage: .carbon <code>" });

    const api = `https://api.giftedtech.co.ke/api/tools/carbon?apikey=gifted&code=${encodeURIComponent(code)}`;

    await sock.sendMessage(from, { text: "⏳ Generating code image..." });

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      image: { url: res.data.result },
      caption: "💻 Carbon Generated"
    });
  }
};
