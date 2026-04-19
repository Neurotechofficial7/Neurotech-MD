const axios = require("axios");

module.exports = {
  name: "proxy",
  category: "tools",

  async execute(sock, msg) {
    const from = msg.key.remoteJid;

    const api = `https://api.giftedtech.co.ke/api/tools/proxy?apikey=gifted`;

    await sock.sendMessage(from, { text: "⏳ Fetching proxies..." });

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      text: "🌐 FREE PROXIES\n\n" + JSON.stringify(res.data, null, 2)
    });
  }
};
