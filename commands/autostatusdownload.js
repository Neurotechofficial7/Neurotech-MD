const fs = require('fs');
const path = require('path');

let statusDownloadEnabled = false;

const autoStatusDownloadCommand = async (sock, chatId, message, args) => {
    const option = args[0];

    if (!option) {
        return await sock.sendMessage(chatId, {
            text: `📥 *Auto Status Download*\n\nStatus: ${statusDownloadEnabled ? "ON ✅" : "OFF ❌"}\n\nUsage:\n.autostatusdownload on\n.autostatusdownload off`
        }, { quoted: message });
    }

    if (option === "on") {
        statusDownloadEnabled = true;
        await sock.sendMessage(chatId, {
            text: "✅ Auto status download enabled"
        }, { quoted: message });

    } else if (option === "off") {
        statusDownloadEnabled = false;
        await sock.sendMessage(chatId, {
            text: "❌ Auto status download disabled"
        }, { quoted: message });
    }
};

const handleAutoStatusDownload = async (sock, message) => {
    try {
        if (!statusDownloadEnabled) return;

        const jid = message.key.remoteJid;

        // Only statuses
        if (jid !== 'status@broadcast') return;

        const msg = message.message;

        const folder = path.join(__dirname, '../status_downloads');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);

        const sender = message.key.participant || "unknown";

        // 📸 IMAGE
        if (msg.imageMessage) {
            const buffer = await sock.downloadMediaMessage(message);
            const filePath = path.join(folder, `img_${Date.now()}.jpg`);
            fs.writeFileSync(filePath, buffer);

            console.log(`✅ Image status saved from ${sender}`);
        }

        // 🎥 VIDEO
        if (msg.videoMessage) {
            const buffer = await sock.downloadMediaMessage(message);
            const filePath = path.join(folder, `vid_${Date.now()}.mp4`);
            fs.writeFileSync(filePath, buffer);

            console.log(`✅ Video status saved from ${sender}`);
        }

    } catch (err) {
        console.error("Auto Status Download Error:", err);
    }
};

module.exports = {
    autoStatusDownloadCommand,
    handleAutoStatusDownload
};
