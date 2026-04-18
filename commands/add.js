const isAdmin = require('../lib/isAdmin');

async function addCommand(sock, chatId, senderId, mentionedJids, message, args) {
    const isOwner = message.key.fromMe;

    // ✅ SAME ADMIN CHECK AS KICK
    if (!isOwner) {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        if (!isBotAdmin) {
            return sock.sendMessage(chatId, {
                text: '❎ Bot must be admin first.'
            }, { quoted: message });
        }

        if (!isSenderAdmin) {
            return sock.sendMessage(chatId, {
                text: '❎ Only admins can use this command.'
            }, { quoted: message });
        }
    }

    let usersToAdd = [];

    // ✅ Mention
    if (mentionedJids && mentionedJids.length > 0) {
        usersToAdd = mentionedJids;
    }
    // ✅ Reply
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        usersToAdd = [message.message.extendedTextMessage.contextInfo.participant];
    }
    // ✅ Number input
    else if (args[0]) {
        let number = args[0].replace(/[^0-9]/g, '');
        usersToAdd = [number + '@s.whatsapp.net'];
    }

    // ❌ No input
    if (usersToAdd.length === 0) {
        return sock.sendMessage(chatId, {
            text: '❌ Use:\n.add @user\nOR reply\nOR .add 2547xxxxxxx'
        }, { quoted: message });
    }

    try {
        // Attempt to add
        const res = await sock.groupParticipantsUpdate(chatId, usersToAdd, "add");

        // 🔥 WAIT a bit for WhatsApp to update
        await new Promise(resolve => setTimeout(resolve, 1500));

        // ✅ GET UPDATED MEMBERS (REAL SOURCE OF TRUTH)
        const metadataAfter = await sock.groupMetadata(chatId);
        const currentMembers = metadataAfter.participants.map(p => p.id);

        let resultsText = `👥 *ADD RESULTS*\n\n`;

        usersToAdd.forEach((jid, i) => {
            const userTag = '@' + jid.split('@')[0];
            const status = res[i]?.status;

            // ✅ REAL CHECK
            if (currentMembers.includes(jid)) {
                resultsText += `${userTag} → ✅ Successfully added\n`;
            } else {
                let reason = '';

                switch (status) {
                    case 400:
                        reason = '❎ Invalid number';
                        break;
                    case 403:
                        reason = '🔒 Privacy settings block adding';
                        break;
                    case 408:
                        reason = '⏳ Recently left group';
                        break;
                    case 409:
                        reason = '⚠️ Already in group';
                        break;
                    case 500:
                        reason = '🚫 Group is full';
                        break;
                    default:
                        reason = '❌ Failed to add';
                }

                resultsText += `${userTag} → ${reason}\n`;
            }
        });

        await sock.sendMessage(chatId, {
            text: resultsText,
            mentions: usersToAdd
        });

    } catch (error) {
        console.error('Add command error:', error);

        await sock.sendMessage(chatId, {
            text: '❌ Failed to process add request.'
        });
    }
}

module.exports = addCommand;
