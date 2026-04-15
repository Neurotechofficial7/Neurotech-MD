const axios = require("axios");

try {
  const word = args.join(" ").trim();

  if (!word) {
    return sock.sendMessage(chatId, {
      text: "❗ Example: .dictionary dog"
    }, { quoted: message });
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const res = await axios.get(url);
  const data = res.data[0];

  const meaning =
    data?.meanings?.[0]?.definitions?.[0]?.definition || "Not available";

  const example =
    data?.meanings?.[0]?.definitions?.[0]?.example || "Not available";

  const phonetic =
    data?.phonetic || data?.phonetics?.[0]?.text || "Not available";

  await sock.sendMessage(chatId, {
    text: `📖 *DICTIONARY RESULT*

🔤 Word: ${word}

🔊 Phonetic:
${phonetic}

📚 Definition:
${meaning}

💡 Example:
${example}

✨ Powered by DictionaryAPI`
  }, { quoted: message });

} catch (err) {
  await sock.sendMessage(chatId, {
    text: "❌ Word not found or API error."
  }, { quoted: message });
}
