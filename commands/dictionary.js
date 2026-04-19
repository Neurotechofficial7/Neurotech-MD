const axios = require("axios");

module.exports = {
  name: "dictionary",
  description: "Get word definition, phonetic & meaning",
  category: "tools",

  async execute(sock, msg, args) {
    const from = msg.key.remoteJid;

    const word = args.join(" ").trim();

    if (!word) {
      return sock.sendMessage(from, {
        text: "❌ Usage:\n.dictionary cat"
      }, { quoted: msg });
    }

    try {
      const api = `https://api.giftedtech.co.ke/api/search/dictionary?apikey=gifted&word=${encodeURIComponent(word)}`;

      const res = await axios.get(api);
      const data = res.data || {};
      const result = data.result || {};

      // ================= SAFE DEFINITIONS =================
      const definition =
        typeof result.definition === "string"
          ? result.definition
          : result.definition?.english ||
            result.definition?.meaning ||
            result.definition?.def ||
            (result.definition ? JSON.stringify(result.definition, null, 2) : "Not available");

      const phonetic =
        typeof result.phonetic === "string"
          ? result.phonetic
          : result.pronunciation ||
            result.phonetic?.text ||
            "Not available";

      const example =
        typeof result.example === "string"
          ? result.example
          : result.example?.text ||
            result.example?.sentence ||
            "Not available";

      // ================= OUTPUT =================
      const text = `📖 *DICTIONARY RESULT*

🔤 Word: ${word}

🔊 Phonetic:
${phonetic}

📚 Definition:
${definition}

💡 Example:
${example}

✨ Powered by Neurotech API`;

      await sock.sendMessage(from, { text }, { quoted: msg });

    } catch (err) {
      console.log(err);

      await sock.sendMessage(from, {
        text: "❌ Error fetching dictionary data. Try again later."
      }, { quoted: msg });
    }
  }
};
