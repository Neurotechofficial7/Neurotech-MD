async function rejectAllCommand(sock, chatId, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: "❌ This command can only be used in groups."
            }, { quoted: message });
        }

        const groupMetadata = await sock.groupMetadata(chatId);

        // check bot admin
        const botId = sock.user.id;
        const botParticipant = groupMetadata.participants.find(
            p => p.id === botId
        );

        if (!botParticipant?.admin) {
            return await sock.sendMessage(chatId, {
                text: "❌ I need to be an admin to reject members."
            }, { quoted: message });
        }

        // get join requests
        let requests = [];
        try {
            if (sock.groupRequestParticipantsList) {
                requests = await sock.groupRequestParticipantsList(chatId);
            }
        } catch (err) {
            console.log("RejectAll request fetch error:", err);
        }

        if (!requests || requests.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "✅ No pending join requests."
            }, { quoted: message });
        }

        const usersToReject = requests.map(r => r.jid);

        // reject all requests
        await sock.groupRequestParticipantsUpdate(
            chatId,
            usersToReject,
            "reject"
        ).catch(async (err) => {
            console.log("RejectAll error:", err);

            return await sock.sendMessage(chatId, {
                text: "❌ Failed to reject requests (feature may not be supported)."
            }, { quoted: message });
        });

        await sock.sendMessage(chatId, {
            text:
`❌ *ALL JOIN REQUESTS REJECTED*

👥 Rejected: ${usersToReject.length}
🚫 All pending requests cleared.`
        }, { quoted: message });

    } catch (err) {
        console.log("RejectAll Command Error:", err);
        await sock.sendMessage(chatId, {
            text: "❌ Error rejecting members."
        }, { quoted: message });
    }
}

module.exports = rejectAllCommand;
