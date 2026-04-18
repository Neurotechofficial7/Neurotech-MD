const isAdmin = require('../lib/isAdmin');

async function addCommand(sock, chatId, senderId, mentionedJids, message, args) {
    const isOwner = message.key.fromMe;

    // ✅ SAME ADMIN CHECK AS KICK
    if (!isOwner) {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        if (!isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Please make the bot an admin first.'
            }, { quoted: message });
            return;
        }

        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Only group admins can use the add command.'
            }, { quoted: message });
            return;
        }
    }

    let usersToAdd = [];

    // ✅ 1. Mention
    if (mentionedJids && mentionedJids.length > 0) {
        usersToAdd = mentionedJids;
    }

    // ✅ 2. Reply
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        usersToAdd = [message.message.extendedTextMessage.contextInfo.participant];
    }

    // ✅ 3. Number input (FIXED 🔥)
    else if (args[0]) {
        let number = args[0].replace(/[^0-9]/g, '');
        usersToAdd = [number + '@s.whatsapp.net'];
    }

    // ❌ No input
    if (usersToAdd.length === 0) {
        await sock.sendMessage(chatId, {
            text: '❌ Use:\n.add @user\nOR reply\nOR .add 2547xxxxxxx'
        }, { quoted: message });
        return;
    }

    try {
        const res = await sock.groupParticipantsUpdate(chatId, usersToAdd, "add");

        let successUsers = [];
        let failedUsers = [];

        usersToAdd.forEach((jid, i) => {
            if (res[i]?.status === 200) {
                successUsers.push(jid);
            } else {
                failedUsers.push(jid);
            }
        });

        if (successUsers.length > 0) {
            await sock.sendMessage(chatId, {
                text: `✅ Added: ${successUsers.map(u => '@' + u.split('@')[0]).join(', ')}`,
                mentions: successUsers
            });
        }

        if (failedUsers.length > 0) {
            const inviteCode = await sock.groupInviteCode(chatId);
            const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

            await sock.sendMessage(chatId, {
                text: `❌ Could not add:\n${failedUsers.map(u => '@' + u.split('@')[0]).join(', ')}\n\n📩 Invite link:\n${inviteLink}`,
                mentions: failedUsers
            });
        }

    } catch (error) {
        console.error('Error in add command:', error);

        await sock.sendMessage(chatId, {
            text: 'Failed to add user(s)!'
        });
    }
}

module.exports = addCommand;
