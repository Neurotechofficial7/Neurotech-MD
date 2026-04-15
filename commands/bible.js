const axios = require("axios");

module.exports = {
  name: "bible",
  description: "Get Bible verse with Swahili & Hindi translations",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const verse = args.join(" ");

    if (!verse) {
      return sock.sendMessage(from, {
        text: "❌ Usage:\n.bible John 3:16"
      }, { quoted: msg });
    }

    try {
      const api = `https://api.giftedtech.co.ke/api/search/bible?apikey=gifted&verse=${encodeURIComponent(verse)}`;

      const res = await axios.get(api);
      const data = res.data;

      if (!data || !data.result) {
        return sock.sendMessage(from, {
          text: "❌ Verse not found. Try again."
        }, { quoted: msg });
      }

      const eng = data.result.english || "Not available";
      const swa = data.result.swahili || "Not available";
      const hin = data.result.hindi || "Not available";

      const text = `📖 *BIBLE VERSE*

🔎 Verse: ${verse}

🇬🇧 English:
${eng}

🇰🇪 Swahili:
${swa}

🇮🇳 Hindi:
${hin}`;

      await sock.sendMessage(from, { text }, { quoted: msg });

    } catch (err) {
      console.log(err);
      await sock.sendMessage(from, {
        text: "❌ Error fetching verse."
      }, { quoted: msg });
    }
  }
};
