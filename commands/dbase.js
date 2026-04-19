const axios = require("axios");

module.exports = {
  name: "dbase",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const query = args.join(" ");

    if (!query) return sock.sendMessage(from, { text: "Usage: .dbase <base64>" });

    const api = `https://api.giftedtech.co.ke/api/tools/dbase?apikey=gifted&query=${encodeURIComponent(query)}`;

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      text: "🔓 DECODED:\n\n" + res.data.result
    });
  }
};
