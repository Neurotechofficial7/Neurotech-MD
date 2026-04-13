async function addCommand(sock, chatId, senderId, message, args) {
    try {
        // Must be group
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: "❌ This command can only be used in groups."
            }, { quoted: message });
        }

        // Get group metadata
        const metadata = await sock.groupMetadata(chatId);

        // Check bot admin
        const botId = sock.user.id;
        const botIsAdmin = metadata.participants.some(
            p => p.id === botId && (p.admin === 'admin' || p.admin === 'superadmin')
        );

        if (!botIsAdmin) {
            return await sock.sendMessage(chatId, {
                text: "❌ I need to be admin to add members."
            }, { quoted: message });
        }

        // Get mentioned users
        let users = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

        // If no mention, use number input
        if (users.length === 0 && args.length > 0) {
            let number = args[0].replace(/[^0-9]/g, '');
            if (!number.endsWith('@s.whatsapp.net')) {
                number = number + '@s.whatsapp.net';
            }
            users.push(number);
        }

        if (users.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "❌ Tag or enter number.\nExample:\n.add 2547XXXXXXXX\nor reply to user"
            }, { quoted: message });
        }

        // Add users
        await sock.groupParticipantsUpdate(chatId, users, "add");

        await sock.sendMessage(chatId, {
            text: `✅ Added ${users.length} member(s) successfully.`
        }, { quoted: message });

    } catch (err) {
        console.log("Add Error:", err);

        await sock.sendMessage(chatId, {
            text: "❌ Failed to add member. They might have privacy settings."
        }, { quoted: message });
    }
}

module.exports = addCommand;
