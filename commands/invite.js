module.exports = async (sock, chatId, message) => {
    try {
        const isGroup = chatId.endsWith('@g.us');

        if (!isGroup) {
            return sock.sendMessage(chatId, {
                text: '❌ This works only in groups.'
            }, { quoted: message });
        }

        const code = await sock.groupInviteCode(chatId);
        const link = `https://chat.whatsapp.com/${code}`;

        await sock.sendMessage(chatId, {
            text: `🔗 *GROUP INVITE LINK*\n\n${link}`
        }, { quoted: message });

    } catch (err) {
        console.error(err);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to get invite link.'
        }, { quoted: message });
    }
};
