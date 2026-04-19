const isAdmin = require('../lib/isAdmin');

async function rejectAll(sock, chatId, senderId, message) {
    const isOwner = message.key.fromMe;

    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isOwner) {
        if (!isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Please make the bot an admin first.'
            }, { quoted: message });
            return;
        }

        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Only group admins can reject join requests.'
            }, { quoted: message });
            return;
        }
    }

    try {
        // 🔥 THIS is the correct way
        const requests = await sock.groupRequestParticipantsList(chatId);

        if (!requests || requests.length === 0) {
            await sock.sendMessage(chatId, {
                text: '❌ No pending join requests found.'
            }, { quoted: message });
            return;
        }

        const usersToReject = requests.map(r => r.jid);

        await sock.groupRequestParticipantsUpdate(
            chatId,
            usersToReject,
            "reject"
        );

        const mentions = usersToReject.map(j => `@${j.split('@')[0]}`);

        await sock.sendMessage(chatId, {
            text: `❌ Rejected all join requests:\n\n${mentions.join('\n')}`,
            mentions: usersToReject
        }, { quoted: message });

    } catch (err) {
        console.error('rejectall error:', err);
        await sock.sendMessage(chatId, {
            text: 'Failed to reject requests!'
        }, { quoted: message });
    }
}

module.exports = rejectAll;
