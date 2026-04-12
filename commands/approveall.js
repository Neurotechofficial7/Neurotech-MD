async function approveAllCommand(sock, chatId, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: "❌ This command can only be used in groups."
            }, { quoted: message });
        }

        // Get group metadata
        const groupMetadata = await sock.groupMetadata(chatId);

        // ✅ FIXED BOT ADMIN CHECK (reliable)
        const botId = sock.user.id;
        const botParticipant = groupMetadata.participants.find(
            p => p.id === botId
        );

        if (!botParticipant?.admin) {
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
                text: "❌ This group does not have join requests enabled or feature not supported."
            }, { quoted: message });
        }

        if (!requests || requests.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "✅ No pending join requests."
            }, { quoted: message });
        }

        // Extract JIDs
        const usersToApprove = requests.map(r => r.jid);

        // Approve all
        await sock.groupRequestParticipantsUpdate(
            chatId,
            usersToApprove,
            "approve"
        );

        await sock.sendMessage(chatId, {
            text:
`✅ *ALL MEMBERS APPROVED*

👥 Approved: ${usersToApprove.length}
📢 All join requests have been accepted successfully.`
        }, { quoted: message });

    } catch (err) {
        console.log("ApproveAll Error:", err);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to approve members."
        }, { quoted: message });
    }
}

module.exports = approveAllCommand;
