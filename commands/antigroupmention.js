const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

const filePath = path.join(__dirname, '../data/antigroupmention.json');

// Load & Save
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
        return sock.sendMessage(chatId, { text: '❌ Group only command.' });
    }

    if (!isSenderAdmin) {
        return sock.sendMessage(chatId, { text: '❌ Only admins can use this.' });
    }

    const data = loadData();
    const action = args[0]; // on/off
    const mode = args[1];   // delete/warn/kick

    if (action === 'on') {
        if (!['delete', 'warn', 'kick'].includes(mode)) {
            return sock.sendMessage(chatId, {
                text: '⚠️ Choose mode: delete / warn / kick\nExample: .antigroupmention on delete'
            });
        }

        data[chatId] = {
            enabled: true,
            mode: mode,
            warnings: {}
        };

        saveData(data);

        return sock.sendMessage(chatId, {
            text: `✅ Anti-group mention ON\nMode: ${mode}`
        });
    }

    if (action === 'off') {
        delete data[chatId];
        saveData(data);

        return sock.sendMessage(chatId, {
            text: '❌ Anti-group mention OFF'
        });
    }

    return sock.sendMessage(chatId, {
        text: 'Usage:\n.antigroupmention on delete\n.antigroupmention on warn\n.antigroupmention on kick\n.antigroupmention off'
    });
};

// ================= DETECTION =================
const handleAntiGroupMention = async (sock, chatId, message, senderId) => {
    try {
        if (!chatId.endsWith('@g.us')) return;

        const data = loadData();
        if (!data[chatId]?.enabled) return;

        // 🔒 Ignore admins
        const adminStatus = await isAdmin(sock, chatId, senderId);
        if (adminStatus.isSenderAdmin) return;

        const context = message.message?.extendedTextMessage?.contextInfo;

        const isGroupMention =
            context?.groupMentions?.length > 0 ||
            context?.mentionedJid?.includes(chatId);

        if (!isGroupMention) return;

        const mode = data[chatId].mode;

        // 🚫 DELETE MESSAGE
        try {
            await sock.sendMessage(chatId, {
                delete: message.key
            });
        } catch {}

        // ================= MODES =================

        if (mode === 'delete') {
            await sock.sendMessage(chatId, {
                text: '🚫 Group mention is not allowed!',
                mentions: [senderId]
            });
        }

        if (mode === 'warn') {
            const warnings = data[chatId].warnings;

            warnings[senderId] = (warnings[senderId] || 0) + 1;

            saveData(data);

            await sock.sendMessage(chatId, {
                text: `⚠️ Warning ${warnings[senderId]}/3\nStop mentioning the group!`,
                mentions: [senderId]
            });

            // 👢 Auto kick after 3 warnings
            if (warnings[senderId] >= 3) {
                await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');

                await sock.sendMessage(chatId, {
                    text: '🚫 User kicked for repeated group mentions!'
                });

                warnings[senderId] = 0;
                saveData(data);
            }
        }

        if (mode === 'kick') {
            await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');

            await sock.sendMessage(chatId, {
                text: '🚫 User removed for mentioning group!',
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
