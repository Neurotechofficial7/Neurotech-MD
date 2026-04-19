const axios = require("axios");

module.exports = {
  name: "tempmailv2",
  description: "Generate a random temporary email address (V2)",
  category: "tools",

  async execute(sock, msg, args) {
    try {
      const from = msg.key.remoteJid;

      const api = `https://api.giftedtech.co.ke/api/tempgen/v1/generate?apikey=gifted`;

      await sock.sendMessage(from, {
        text: "⏳ Generating TEMP MAIL V2..."
      });

      const response = await axios.get(api);
      const data = response.data;

      // flexible response handling (API sometimes changes structure)
      const email =
        data?.email ||
        data?.result?.email ||
        data?.data?.email;

      if (!email) {
        return sock.sendMessage(from, {
          text: "❌ Failed to generate TEMP MAIL V2. Try again later."
        });
      }

      await sock.sendMessage(from, {
        text:
`📧 *TEMP MAIL V2 GENERATED*

✉️ Email: ${email}

⚡ Type: V2 System
⏳ Status: Active

⚠️ Do not lose access — inbox may expire soon.`
      });

    } catch (err) {
      console.log("TempMailV2 Error:", err);

      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ TEMP MAIL V2 ERROR: API failed or unreachable."
      });
    }
  }
};
