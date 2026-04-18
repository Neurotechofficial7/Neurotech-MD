const isAdmin = require('../lib/isAdmin');

async function approveAll(sock, chatId, senderId, message) {
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
                text: 'Only group admins can approve join requests.'
            }, { quoted: message });
            return;
        }
    }

    try {
        // 🔥 SAME SOURCE AS REJECTALL (THIS FIXES IT)
        const requests = await sock.groupRequestParticipantsList(chatId);

        if (!requests || requests.length === 0) {
            await sock.sendMessage(chatId, {
                text: '❌ No pending join requests found.'
            }, { quoted: message });
            return;
        }

        const usersToApprove = requests.map(r => r.jid);

        await sock.groupRequestParticipantsUpdate(
            chatId,
            usersToApprove,
            "approve"
        );

        const mentions = usersToApprove.map(j => `@${j.split('@')[0]}`);

        await sock.sendMessage(chatId, {
            text: `✅ Approved all join requests:\n\n${mentions.join('\n')}`,
            mentions: usersToApprove
        }, { quoted: message });

    } catch (err) {
        console.error('approveall error:', err);
        await sock.sendMessage(chatId, {
            text: 'Failed to approve requests!'
        }, { quoted: message });
    }
}

module.exports = approveAll;
