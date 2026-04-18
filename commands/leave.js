const isOwnerOrSudo = require('../lib/isOwner'); // adjust path if needed

module.exports = async (sock, chatId, message) => {
    try {
        // ✅ Only works in groups
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, {
                text: '❌ This command works only in groups.'
            }, { quoted: message });
        }

        const senderId = message.key.participant || message.key.remoteJid;

        // ✅ Owner OR Sudo check
        const isAllowed = await isOwnerOrSudo(senderId, sock, chatId);

        if (!isAllowed) {
            return sock.sendMessage(chatId, {
                text: '🚫 Only owner or sudo can use this command.'
            }, { quoted: message });
        }

        // ✅ Send goodbye message before leaving
        await sock.sendMessage(chatId, {
            text: '👋 Leaving the group... Goodbye!'
        }, { quoted: message });

        // Small delay (optional, ensures message sends)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // ✅ Leave group
        await sock.groupLeave(chatId);

    } catch (err) {
        console.error("LEAVE ERROR:", err);

        await sock.sendMessage(chatId, {
            text: '❌ Failed to leave group.'
        }, { quoted: message });
    }
};
