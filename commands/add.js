module.exports = async (sock, chatId, message, args) => {
    try {
        const isGroup = chatId.endsWith('@g.us');

        if (!isGroup) {
            return sock.sendMessage(chatId, {
                text: '❌ This command works only in groups.'
            }, { quoted: message });
        }

        // Get group metadata
        const metadata = await sock.groupMetadata(chatId);
        const participants = metadata.participants;

        const sender = message.key.participant || message.key.remoteJid;

        // ✅ Check if sender is admin
        const isAdmin = participants.some(
            p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin')
        );

        // ✅ Check if bot is admin
        const botNumber = sock.user.id.split(':')[0];
        const isBotAdmin = participants.some(
            p => p.id.includes(botNumber) && (p.admin === 'admin' || p.admin === 'superadmin')
        );

        if (!isAdmin) {
            return sock.sendMessage(chatId, {
                text: '🚫 Admin only command.'
            }, { quoted: message });
        }

        if (!isBotAdmin) {
            return sock.sendMessage(chatId, {
                text: '❎ Bot must be admin to add members.'
            }, { quoted: message });
        }

        // ✅ Get number
        let number;

        if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            number = message.message.extendedTextMessage.contextInfo.participant;
        } else if (args[0]) {
            number = args[0];
        } else {
            return sock.sendMessage(chatId, {
                text: '❎ Provide a number or reply to a user.'
            }, { quoted: message });
        }

        // ❌ prevent tagging
        if (number.startsWith('@')) {
            return sock.sendMessage(chatId, {
                text: "❎ Don't tag, provide number directly."
            }, { quoted: message });
        }

        // ✅ Clean number
        number = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        // ✅ Add user
        const res = await sock.groupParticipantsUpdate(chatId, [number], "add");

        const status = res?.[0]?.status;

        const statusMessages = {
            400: "❎ Invalid number (use country code).",
            403: "❎ User privacy settings prevent adding.",
            408: "❎ User recently left group.",
            409: "❎ User already in group.",
            500: "❎ Group is full.",
            200: "✅ User added successfully."
        };

        const text = statusMessages[status] || "❎ Failed to add user.";

        return sock.sendMessage(chatId, { text }, { quoted: message });

    } catch (err) {
        console.error("ADD ERROR:", err);

        return sock.sendMessage(chatId, {
            text: '❌ ' + err.message
        }, { quoted: message });
    }
};
