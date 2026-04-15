const axios = require("axios");

module.exports = {
  name: "bible",
  description: "Bible Verse Lookup with Swahili & Hindi translations",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const verse = args.join(" ").trim();

    if (!verse) {
      return sock.sendMessage(from, {
        text: "❌ Usage:\n.bible John 3:16"
      }, { quoted: msg });
    }

    try {
      const url = `https://api.giftedtech.co.ke/api/search/bible?apikey=gifted&verse=${encodeURIComponent(verse)}`;

      const res = await axios.get(url);
      const data = res.data || {};

      const result = data.result || {};
      const translations = data.translations || {};

      // ================= FLEXIBLE PARSING =================
      const eng =
        result.text ||
        result.verse ||
        result.english ||
        data.verse ||
        "Not available";

      const swa =
        translations.swahili ||
        translations.sw ||
        result.swahili ||
        "Not available";

      const hin =
        translations.hindi ||
        translations.hi ||
        result.hindi ||
        "Not available";

      // ================= SAFETY CHECK =================
      if (
        eng === "Not available" &&
        swa === "Not available" &&
        hin === "Not available"
      ) {
        return sock.sendMessage(from, {
          text: "❌ Verse not found or API returned empty data."
        }, { quoted: msg });
      }

      const text = `📖 *BIBLE VERSE*

🔎 Verse: ${verse}

──────────────────
🇬🇧 *English*
${eng}

──────────────────
🇰🇪 *Swahili*
${swa}

──────────────────
🇮🇳 *Hindi*
${hin}

──────────────────
✨ Powered by Gifted API`;

      await sock.sendMessage(from, { text }, { quoted: msg });

    } catch (err) {
      console.log(err);

      await sock.sendMessage(from, {
        text: "❌ Error fetching Bible verse. Try again later."
      }, { quoted: msg });
    }
  }
};
