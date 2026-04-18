const isAdmin = require('../lib/isAdmin');

async function addCommand(sock, chatId, senderId, mentionedJids, message, args) {
    const isOwner = message.key.fromMe;

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
    // ✅ Number
    else if (args[0]) {
        let number = args[0].replace(/[^0-9]/g, '');
        usersToAdd = [number + '@s.whatsapp.net'];
    }

    if (usersToAdd.length === 0) {
        return sock.sendMessage(chatId, {
            text: '❌ Use:\n.add @user\nOR reply\nOR .add 2547xxxxxxx'
        }, { quoted: message });
    }

    try {
        const res = await sock.groupParticipantsUpdate(chatId, usersToAdd, "add");

        let resultsText = `👥 *ADD RESULTS*\n\n`;

        usersToAdd.forEach((jid, i) => {
            const status = res[i]?.status;
            const userTag = '@' + jid.split('@')[0];

            let reason = '';

            switch (status) {
                case 200:
                    reason = '✅ Successfully added';
                    break;
                case 400:
                    reason = '❎ Invalid number';
                    break;
                case 403:
                    reason = '🔒 User privacy settings prevent adding';
                    break;
                case 408:
                    reason = '⏳ User recently left the group';
                    break;
                case 409:
                    reason = '⚠️ User already in group';
                    break;
                case 500:
                    reason = '🚫 Group is full';
                    break;
                default:
                    reason = '❌ Failed to add (unknown reason)';
            }

            resultsText += `${userTag} → ${reason}\n`;
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
