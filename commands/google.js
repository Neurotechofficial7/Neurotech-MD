const axios = require("axios");

module.exports = {
  name: "google",
  description: "Get Google search results",
  category: "search",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const query = args.join(" ").trim();

    if (!query) {
      return sock.sendMessage(from, {
        text: "❌ Usage:\n.google how to make money online"
      }, { quoted: msg });
    }

    try {
      const api = `https://api.giftedtech.co.ke/api/search/google?apikey=gifted&query=${encodeURIComponent(query)}`;

      const res = await axios.get(api);
      const data = res.data || {};

      const results = data.result || data.results || [];

      if (!results.length) {
        return sock.sendMessage(from, {
          text: "❌ No results found."
        }, { quoted: msg });
      }

      let text = `🔎 *GOOGLE SEARCH RESULTS*\n\n📌 Query: ${query}\n\n`;

      results.slice(0, 5).forEach((r, i) => {
        text += `🔹 *${i + 1}*\n`;
        text += `📄 Title: ${r.title || "No title"}\n`;
        text += `🔗 Link: ${r.url || r.link || "No link"}\n`;
        text += `📝 Description: ${r.snippet || r.description || "No description"}\n\n`;
      });

      text += `✨ Powered by Neurotech API`;

      await sock.sendMessage(from, { text }, { quoted: msg });

    } catch (err) {
      console.log(err);

      await sock.sendMessage(from, {
        text: "❌ Error fetching Google results."
      }, { quoted: msg });
    }
  }
};
