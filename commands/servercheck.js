const axios = require("axios");

module.exports = {
  name: "servercheck",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const url = args[0];

    if (!url) return sock.sendMessage(from, { text: "Usage: .servercheck <url>" });

    const api = `https://api.giftedtech.co.ke/api/tools/server-check?apikey=gifted&url=${encodeURIComponent(url)}`;

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      text: "📡 SERVER STATUS\n\n" + JSON.stringify(res.data, null, 2)
    });
  }
};
