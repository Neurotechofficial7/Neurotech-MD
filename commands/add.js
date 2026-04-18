const isOwnerOrSudo = require('../lib/isOwner');

module.exports = async (sock, chatId, message, args) => {
    try {
        // ✅ Must be group
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, {
                text: '❌ This command works only in groups.'
            }, { quoted: message });
        }

        const senderId = message.key.participant || message.key.remoteJid;

        // ✅ Owner / Sudo check
        const isAllowed = await isOwnerOrSudo(senderId, sock, chatId);

        if (!isAllowed) {
            return sock.sendMessage(chatId, {
                text: '🚫 Only owner or sudo can use this command.'
            }, { quoted: message });
        }

        // ✅ Get group data
        const metadata = await sock.groupMetadata(chatId);
        const participants = metadata.participants;

        // ✅ FIXED BOT ADMIN CHECK
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';

        const bot = participants.find(p =>
            p.id === botId || p.id.startsWith(botId.split('@')[0])
        );

        const isBotAdmin = bot && (bot.admin === 'admin' || bot.admin === 'superadmin');

        // 🔍 DEBUG (you can remove later)
        console.log("BOT ID:", sock.user.id);
        console.log("BOT FOUND:", bot);
        console.log("IS BOT ADMIN:", isBotAdmin);

        if (!isBotAdmin) {
            return sock.sendMessage(chatId, {
                text: '❎ Bot is not admin in this group.'
            }, { quoted: message });
        }

        // ✅ Get number (reply or args)
        let number;

        if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            number = message.message.extendedTextMessage.contextInfo.participant;
        } else if (args[0]) {
            number = args[0];
        } else {
            return sock.sendMessage(chatId, {
                text: '❎ Provide a number or reply to a user.'
            }, { quoted: message });
        }

        // ❌ prevent tagging
        if (number.startsWith('@')) {
            return sock.sendMessage(chatId, {
                text: "❎ Don't tag, provide number directly."
            }, { quoted: message });
        }

        // ✅ Clean + format
        number = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        // ✅ Try adding
        const res = await sock.groupParticipantsUpdate(chatId, [number], "add");
        const status = res?.[0]?.status;

        const statusMessages = {
            200: "✅ User added successfully.",
            400: "❎ Invalid number.",
            403: "❎ User privacy blocks adding.",
            408: "❎ User left recently.",
            409: "❎ Already in group.",
            500: "❎ Group is full."
        };

        if (status === 200) {
            return sock.sendMessage(chatId, {
                text: statusMessages[200]
            }, { quoted: message });
        }

        // ❌ fallback → invite link
        const inviteCode = await sock.groupInviteCode(chatId);
        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        return sock.sendMessage(chatId, {
            text: `${statusMessages[status] || '❌ Failed to add user.'}\n\n📩 Invite link:\n${inviteLink}`
        }, { quoted: message });

    } catch (err) {
        console.error("ADD ERROR:", err);

        return sock.sendMessage(chatId, {
            text: '❌ ' + err.message
        }, { quoted: message });
    }
};
