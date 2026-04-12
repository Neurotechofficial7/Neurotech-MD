async function approveAllCommand(sock, chatId, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: "❌ This command can only be used in groups."
            }, { quoted: message });
        }

        const groupMetadata = await sock.groupMetadata(chatId);

        // ✅ FIX: normalize bot id properly
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';

        const botParticipant = groupMetadata.participants.find(p =>
            p.id === botId || p.id.startsWith(sock.user.id.split('@')[0])
        );

        const isBotAdmin = botParticipant?.admin;

        if (!isBotAdmin) {
            return await sock.sendMessage(chatId, {
                text: "❌ I need to be an admin to approve members."
            }, { quoted: message });
        }

        // Get join requests
        let requests;
        try {
            requests = await sock.groupRequestParticipantsList(chatId);
        } catch (err) {
            return await sock.sendMessage(chatId, {
                text: "❌ This group does not support join requests."
            }, { quoted: message });
        }

        if (!requests || requests.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "✅ No pending join requests."
            }, { quoted: message });
        }

        const usersToApprove = requests.map(r => r.jid);

        await sock.groupRequestParticipantsUpdate(
            chatId,
            usersToApprove,
            "approve"
        );

        await sock.sendMessage(chatId, {
            text:
`✅ *ALL MEMBERS APPROVED*

👥 Approved: ${usersToApprove.length}
📢 Requests cleared successfully.`
        }, { quoted: message });

    } catch (err) {
        console.log("ApproveAll Error:", err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to approve members."
        }, { quoted: message });
    }
}

module.exports = approveAllCommand;
