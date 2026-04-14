const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/antigroupmention.json');

// Load data
const loadData = () => {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath));
};

// Save data
const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// COMMAND: .antigroupmention on/off
const antigroupmentionCommand = async (sock, chatId, message, senderId, args, isAdmin) => {
    if (!chatId.endsWith('@g.us')) {
        return sock.sendMessage(chatId, { text: '❌ This command is for groups only.' });
    }

    if (!isAdmin) {
        return sock.sendMessage(chatId, { text: '❌ Only admins can use this command.' });
    }

    const option = args[0];
    const data = loadData();

    if (option === 'on') {
        data[chatId] = true;
        saveData(data);
        return sock.sendMessage(chatId, { text: '✅ Anti-group mention enabled.' });
    }

    if (option === 'off') {
        delete data[chatId];
        saveData(data);
        return sock.sendMessage(chatId, { text: '❌ Anti-group mention disabled.' });
    }

    return sock.sendMessage(chatId, {
        text: 'Usage: .antigroupmention on/off'
    });
};

// DETECTION FUNCTION
const handleAntiGroupMention = async (sock, chatId, message, senderId) => {
    try {
        if (!chatId.endsWith('@g.us')) return;

        const data = loadData();
        if (!data[chatId]) return;

        const msg = message.message;

        let groupMentionDetected = false;

        // 🔥 CHECK 1: groupMentions (IMPORTANT)
        const groupMentions = msg?.extendedTextMessage?.contextInfo?.groupMentions;
        if (groupMentions && groupMentions.length > 0) {
            groupMentionDetected = true;
        }

        // 🔥 CHECK 2: @everyone / @all text
        const text =
            msg?.conversation ||
            msg?.extendedTextMessage?.text ||
            '';

        if (text.toLowerCase().includes('@everyone') || text.toLowerCase().includes('@all')) {
            groupMentionDetected = true;
        }

        if (!groupMentionDetected) return;

        // 🚫 TAKE ACTION
        await sock.sendMessage(chatId, {
            text: `🚫 Group mentions are not allowed!`,
            mentions: [senderId]
        });

        // 🔥 Optional: delete message (if bot admin)
        try {
            await sock.sendMessage(chatId, {
                delete: message.key
            });
        } catch (e) {}

    } catch (err) {
        console.log('AntiGroupMention Error:', err);
    }
};

module.exports = {
    antigroupmentionCommand,
    handleAntiGroupMention
};
