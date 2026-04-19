const axios = require("axios");

module.exports = {
  name: "qr",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const text = args.join(" ");

    if (!text) return sock.sendMessage(from, { text: "Usage: .qr <text>" });

    const api = `https://api.giftedtech.co.ke/api/tools/createqr?apikey=gifted&query=${encodeURIComponent(text)}`;

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      image: { url: res.data.result },
      caption: "📱 QR Code Generated"
    });
  }
};
