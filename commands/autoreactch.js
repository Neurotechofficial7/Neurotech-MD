let autoReact = false;
let emojis = ['🔥'];

async function autoReactChannelCommand(sock, chatId, message, args) {
    try {
        if (!args[0]) {
            return sock.sendMessage(chatId, {
                text: `❌ Usage:\n.autoreactch on 🔥\n.autoreactch off`
            }, { quoted: message });
        }

        const mode = args[0].toLowerCase();

        if (mode === 'on') {
            autoReact = true;

            if (args.length > 1) {
                emojis = args.slice(1);
            }

            return sock.sendMessage(chatId, {
                text: `✅ Auto Channel Reaction Enabled\nEmojis: ${emojis.join(' ')}`
            }, { quoted: message });
        }

        if (mode === 'off') {
            autoReact = false;

            return sock.sendMessage(chatId, {
                text: `❌ Auto Channel Reaction Disabled`
            }, { quoted: message });
        }

    } catch (err) {
        console.error(err);
    }
}

// 🔥 MAIN LISTENER
async function handleChannelAutoReact(sock, message) {
    try {
        if (!autoReact) return;

        const chatId = message.key.remoteJid;

        // ✅ Detect WhatsApp Channel
        if (!chatId || !chatId.includes('@newsletter')) return;

        const msgKey = message.key;

        for (let emoji of emojis) {
            await sock.sendMessage(chatId, {
                react: {
                    text: emoji,
                    key: msgKey
                }
            });

            // Delay to avoid spam detection
            await new Promise(r => setTimeout(r, 500));
        }

    } catch (err) {
        console.error('Auto React Error:', err);
    }
}

module.exports = {
    autoReactChannelCommand,
    handleChannelAutoReact
};
