async function reactChannelCommand(sock, chatId, message, args) {
    try {
        const emojis = args.join(' ').trim();

        if (!emojis) {
            return sock.sendMessage(chatId, {
                text: '❌ Example:\n.reactch 🔥\n.reactch ❤️ 😂'
            }, { quoted: message });
        }

        // ✅ Must reply to a message
        const context = message.message?.extendedTextMessage?.contextInfo;

        if (!context || !context.stanzaId) {
            return sock.sendMessage(chatId, {
                text: '❌ Reply to a channel message to react.'
            }, { quoted: message });
        }

        const msgId = context.stanzaId;
        const participant = context.participant || chatId;

        const emojiList = emojis.split(' ');

        for (let emoji of emojiList) {
            await sock.sendMessage(chatId, {
                react: {
                    text: emoji,
                    key: {
                        remoteJid: chatId,
                        fromMe: false,
                        id: msgId,
                        participant: participant
                    }
                }
            });

            // small delay to avoid spam block
            await new Promise(r => setTimeout(r, 500));
        }

        await sock.sendMessage(chatId, {
            text: `✅ Reacted with: ${emojiList.join(' ')}`
        }, { quoted: message });

    } catch (error) {
        console.error('Reaction error:', error);

        await sock.sendMessage(chatId, {
            text: '❌ Failed to send reactions.'
        }, { quoted: message });
    }
}

module.exports = reactChannelCommand;
