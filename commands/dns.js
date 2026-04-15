const axios = require("axios");

module.exports = {
  name: "dns",
  description: "Check DNS records",
  category: "tools",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;
      const domain = args[0];

      if (!domain) {
        return sock.sendMessage(from, {
          text: "❌ Usage: .dns example.com"
        });
      }

      const api = `https://api.giftedtech.co.ke/api/tools/dns-check?apikey=gifted&domain=${domain}`;

      await sock.sendMessage(from, { text: "⏳ Checking DNS..." });

      const res = await axios.get(api);

      await sock.sendMessage(from, {
        text: `🌐 DNS RESULTS:\n\n${JSON.stringify(res.data, null, 2)}`
      });

    } catch (e) {
      sock.sendMessage(msg.key.remoteJid, { text: "❌ Error" });
    }
  }
};
