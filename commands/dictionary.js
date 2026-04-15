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

      const definition =
        result.definition ||
        result.meaning ||
        result.def ||
        "Not available";

      const phonetic =
        result.phonetic ||
        result.pronunciation ||
        "Not available";

      const example =
        result.example ||
        "Not available";

      const text = `📖 *DICTIONARY RESULT*

🔤 Word: ${word}

🔊 Phonetic:
${phonetic}

📚 Definition:
${definition}

💡 Example:
${example}

✨ Powered by Gifted API`;

      await sock.sendMessage(from, { text }, { quoted: msg });

    } catch (err) {
      console.log(err);

      await sock.sendMessage(from, {
        text: "❌ Error fetching word definition. Try again later."
      }, { quoted: msg });
    }
  }
};
