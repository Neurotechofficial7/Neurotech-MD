module.exports = async (sock, chatId, message) => {
    try {
        const sender = message.key.participant || message.key.remoteJid;

        // Only owner / sudo / bot itself
        const isOwner = message.key.fromMe;

        if (!isOwner) {
            return await sock.sendMessage(chatId, {
                text: "❌ Only the bot owner can use this command."
            }, { quoted: message });
        }

        // Get mentioned user OR replied user
        const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quoted = message.message?.extendedTextMessage?.contextInfo?.participant;

        const target = mentioned[0] || quoted;

        if (!target) {
            return await sock.sendMessage(chatId, {
                text: "❗ Usage: .block @user OR reply to a message"
            }, { quoted: message });
        }

        await sock.updateBlockStatus(target, "block");

        await sock.sendMessage(chatId, {
            text: `🚫 Successfully blocked user:\n@${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: message });

    } catch (err) {
        console.log(err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to block user."
        }, { quoted: message });
    }
};
