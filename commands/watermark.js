const axios = require("axios");

module.exports = {
  name: "watermark",
  description: "AI Watermark Remover - Remove watermarks from images",
  category: "ai",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const url = args[0];

      if (!url) {
        return await sock.sendMessage(from, {
          text: `❌ Please provide an image URL.\n\n📌 Example:\n.watermark https://image-link.jpg`
        });
      }

      await sock.sendMessage(from, {
        text: "⏳ Removing watermark... please wait"
      });

      const api = `https://api.giftedtech.co.ke/api/tools/watermarkremover?apikey=gifted&url=${encodeURIComponent(url)}`;

      const response = await axios.get(api);
      const data = response.data;

      if (!data || !data.success) {
        return await sock.sendMessage(from, {
          text: "❌ Failed to remove watermark. Try another image."
        });
      }

      const resultImage = data.result;

      await sock.sendMessage(from, {
        image: { url: resultImage },
        caption: "✅ Watermark removed successfully"
      });

    } catch (err) {
      console.log("Watermark Error:", err);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Error processing image"
      });
    }
  }
};
