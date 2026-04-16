module.exports = async (sock, chatId, message) => {
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

        // ✅ FIXED bot admin detection (works for all Baileys formats)
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
                text: '❌ Bot must be admin to approve requests.'
            }, { quoted: message });
        }

        // ✅ Get pending join requests
        const requests = await sock.groupRequestParticipantsList(chatId);

        if (!requests || requests.length === 0) {
            return sock.sendMessage(chatId, {
                text: '❌ No pending join requests.'
            }, { quoted: message });
        }

        let approved = 0;

        // ✅ Approve all users
        for (let user of requests) {
            await sock.groupRequestParticipantsUpdate(
                chatId,
                [user.jid],
                "approve"
            );
            approved++;
        }

        return sock.sendMessage(chatId, {
            text: `✅ Approved ${approved} pending requests.`
        }, { quoted: message });

    } catch (err) {
        console.error("APPROVEALL ERROR:", err);

        return sock.sendMessage(chatId, {
            text: '❌ Failed to approve requests.'
        }, { quoted: message });
    }
};
