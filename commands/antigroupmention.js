const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

const filePath = path.join(__dirname, '../data/antigroupmention.json');

// ================= DATA =================
const loadData = () => {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath));
};

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ================= COMMAND =================
const antigroupmentionCommand = async (sock, chatId, message, senderId, args, isSenderAdmin) => {

    if (!chatId.endsWith('@g.us')) {
        return sock.sendMessage(chatId, { text: '❌ This command works in groups only.' });
    }

    if (!isSenderAdmin) {
        return sock.sendMessage(chatId, { text: '❌ Only admins can use this command.' });
    }

    const data = loadData();

    const action = args[0]; // on/off
    const mode = args[1];   // delete/warn/kick

    if (action === 'on') {

        if (!['delete', 'warn', 'kick'].includes(mode)) {
            return sock.sendMessage(chatId, {
                text: '⚠️ Usage:\n.antigroupmention on delete\n.antigroupmention on warn\n.antigroupmention on kick'
            });
        }

        data[chatId] = {
            enabled: true,
            mode: mode,
            warnings: {}
        };

        saveData(data);

        return sock.sendMessage(chatId, {
            text: `✅ Anti-Group-Mention ENABLED\nMode: ${mode}`
        });
    }

    if (action === 'off') {
        delete data[chatId];
        saveData(data);

        return sock.sendMessage(chatId, {
            text: '❌ Anti-Group-Mention DISABLED'
        });
    }

    return sock.sendMessage(chatId, {
        text: 'Usage:\n.antigroupmention on delete\n.antigroupmention on warn\n.antigroupmention on kick\n.antigroupmention off'
    });
};

// ================= DETECTION SYSTEM =================
const handleAntiGroupMention = async (sock, chatId, message, senderId) => {

    try {
        if (!chatId.endsWith('@g.us')) return;

        const data = loadData();
        if (!data[chatId]?.enabled) return;

        const mode = data[chatId].mode;

        // ================= IGNORE ADMINS =================
        const adminStatus = await isAdmin(sock, chatId, senderId);
        if (adminStatus?.isSenderAdmin) return;

        const msg = message.message;

        const context = msg?.extendedTextMessage?.contextInfo;

        const text =
            msg?.conversation ||
            msg?.extendedTextMessage?.text ||
            msg?.imageMessage?.caption ||
            msg?.videoMessage?.caption ||
            "";

        // ================= GROUP MENTION DETECTION =================
        const hasFakeMention =
            text.toLowerCase().includes('@group') ||
            text.toLowerCase().includes('@everyone') ||
            text.toLowerCase().includes('@here');

        const hasContextMention =
            context?.mentionedJid?.some(jid => jid.endsWith('@g.us')) ||
            context?.groupMentions?.length > 0;

        // ================= STATUS / FORWARDED MENTION DETECTION =================
        const isStatusMention =
            context?.isForwarded ||
            context?.forwarded ||
            context?.quotedMessage ||
            text.toLowerCase().includes('status');

        const isGroupMention =
            hasFakeMention || hasContextMention;

        // ONLY ACT INSIDE GROUP CONTEXT
        if (!isGroupMention) return;

        // ================= DELETE MESSAGE =================
        try {
            await sock.sendMessage(chatId, {
                delete: message.key
            });
        } catch {}

        // ================= WARN SYSTEM =================
        if (mode === 'warn') {

            const warnings = data[chatId].warnings;

            warnings[senderId] = (warnings[senderId] || 0) + 1;

            saveData(data);

            await sock.sendMessage(chatId, {
                text: `⚠️ @${senderId.split('@')[0]} Warning ${warnings[senderId]}/3\nNo group/status mentions allowed!`,
                mentions: [senderId]
            });

            if (warnings[senderId] >= 3) {
                await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');

                await sock.sendMessage(chatId, {
                    text: `🔨 @${senderId.split('@')[0]} removed for repeated violations!`,
                    mentions: [senderId]
                });

                warnings[senderId] = 0;
                saveData(data);
            }
        }

        // ================= DELETE MODE =================
        if (mode === 'delete') {
            await sock.sendMessage(chatId, {
                text: '🚫 Group/status mention is not allowed!',
                mentions: [senderId]
            });
        }

        // ================= KICK MODE =================
        if (mode === 'kick') {
            await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');

            await sock.sendMessage(chatId, {
                text: `🚫 @${senderId.split('@')[0]} removed for group/status mention!`,
                mentions: [senderId]
            });
        }

    } catch (err) {
        console.log('AntiGroupMention Error:', err);
    }
};

module.exports = {
    antigroupmentionCommand,
    handleAntiGroupMention
};
