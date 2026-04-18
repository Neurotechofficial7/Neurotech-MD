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

        if (!target) {
            return await sock.sendMessage(chatId, {
                text: '❌ No user found to block.'
            }, { quoted: message });
        }

        await sock.updateBlockStatus(target, 'block');

        await sock.sendMessage(chatId, {
            text: `🚫 Successfully blocked:\n@${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: message });

    } catch (err) {
        console.log('BLOCK ERROR:', err);

        await sock.sendMessage(chatId, {
            text: '❌ Failed to block user (check console for error).'
        });
    }
};
