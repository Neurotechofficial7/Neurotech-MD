const axios = require("axios");

module.exports = {
  name: "web2zip",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const url = args[0];

    if (!url) return sock.sendMessage(from, { text: "Usage: .web2zip <url>" });

    const api = `https://api.giftedtech.co.ke/api/tools/web2zip?apikey=gifted&url=${encodeURIComponent(url)}`;

    await sock.sendMessage(from, { text: "⏳ Zipping website..." });

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      document: { url: res.data.result },
      mimetype: "application/zip",
      fileName: "website.zip"
    });
  }
};
