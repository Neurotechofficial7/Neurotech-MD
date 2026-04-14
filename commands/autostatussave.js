const fs = require('fs');
const path = require('path');

// store ON/OFF state
let autoStatusEnabled = false;

const autoStatusCommand = async (sock, chatId, message, args) => {
    const option = args[0];

    if (!option) {
        return await sock.sendMessage(chatId, {
            text: `📥 *Auto Status Saver*\n\nStatus: ${autoStatusEnabled ? "ON ✅" : "OFF ❌"}\n\nUsage:\n.autostatus on\n.autostatus off`
        }, { quoted: message });
    }

    if (option === "on") {
        autoStatusEnabled = true;
        await sock.sendMessage(chatId, { text: "✅ Auto status saving enabled" }, { quoted: message });
    } else if (option === "off") {
        autoStatusEnabled = false;
        await sock.sendMessage(chatId, { text: "❌ Auto status saving disabled" }, { quoted: message });
    }
};

const handleStatusSave = async (sock, message) => {
    try {
        if (!autoStatusEnabled) return;

        const jid = message.key.remoteJid;

        // Only status
        if (jid !== 'status@broadcast') return;

        const msg = message.message;

        const folder = path.join(__dirname, '../saved_status');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);

        // IMAGE
        if (msg.imageMessage) {
            const buffer = await sock.downloadMediaMessage(message);
            const filePath = path.join(folder, `status_${Date.now()}.jpg`);
            fs.writeFileSync(filePath, buffer);

            console.log("✅ Image status saved");
        }

        // VIDEO
        if (msg.videoMessage) {
            const buffer = await sock.downloadMediaMessage(message);
            const filePath = path.join(folder, `status_${Date.now()}.mp4`);
            fs.writeFileSync(filePath, buffer);

            console.log("✅ Video status saved");
        }

    } catch (err) {
        console.error("Status Save Error:", err);
    }
};

module.exports = {
    autoStatusCommand,
    handleStatusSave
};
