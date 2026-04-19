const axios = require("axios");

module.exports = {
  name: "encryptv3",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;
    const code = args.join(" ");

    if (!code) return sock.sendMessage(from, { text: "Usage: .encryptv3 <code>" });

    const api = `https://api.giftedtech.co.ke/api/tools/encryptv3?apikey=gifted&code=${encodeURIComponent(code)}`;

    const res = await axios.get(api);

    await sock.sendMessage(from, {
      text: "🔐 OBFUSCATED CODE:\n\n" + res.data.result
    });
  }
};
