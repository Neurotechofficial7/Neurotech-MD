const isOwnerOrSudo = require('../lib/isOwner');

function toJid(num) {
    if (!num) return null;
    if (num.includes('@')) return num;
    return num.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
}

module.exports = async (sock, chatId, message) => {
    try {
        const senderId = message.key.participant || message.key.remoteJid;

        const mentions =
            message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

        const quoted =
            message.message?.extendedTextMessage?.contextInfo?.participant;

        const owner = await isOwnerOrSudo(senderId, sock, chatId);

        if (!message.key.fromMe && !owner) {
            return await sock.sendMessage(chatId, {
                text: '❌ Only owner can use this command.'
            }, { quoted: message });
        }

        let target = mentions[0] || quoted || senderId;
        target = toJid(target);

        console.log("🔍 Blocking:", target);

        if (!target) {
            return await sock.sendMessage(chatId, {
                text: '❌ No valid user found.'
            }, { quoted: message });
        }

        // 🔥 NEW METHOD (IMPORTANT FIX)
        await sock.chatModify(
            {
                block: 'block'
            },
            target
        );

        await sock.sendMessage(chatId, {
            text: `🚫 Blocked successfully:\n@${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: message });

    } catch (err) {
        console.log("❌ BLOCK ERROR FULL:", err);

        await sock.sendMessage(chatId, {
            text: '❌ Block failed. Check console for exact error.'
        });
    }
};
