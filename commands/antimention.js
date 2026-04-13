const fs = require('fs');

const DATA_FILE = './data/antimention.json';

// Load data
function loadData() {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save data
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Command to enable/disable
async function antimentionCommand(sock, chatId, message, senderId, args, isAdmin) {
    let data = loadData();

    if (!data[chatId]) {
        data[chatId] = {
            enabled: false,
            mode: "warn", // warn or kick
            warnings: {}
        };
    }

    if (!isAdmin && !message.key.fromMe) {
        return sock.sendMessage(chatId, {
            text: "❌ Only admins can use this command."
        }, { quoted: message });
    }

    const option = args[0];

    if (option === 'on') {
        data[chatId].enabled = true;
    } else if (option === 'off') {
        data[chatId].enabled = false;
    } else if (option === 'kick') {
        data[chatId].mode = 'kick';
    } else if (option === 'warn') {
        data[chatId].mode = 'warn';
    } else {
        return sock.sendMessage(chatId, {
            text: `📌 Usage:
.antimention on/off
.antimention warn
.antimention kick`
        }, { quoted: message });
    }

    saveData(data);

    return sock.sendMessage(chatId, {
        text: `✅ AntiMention updated:\nStatus: ${data[chatId].enabled}\nMode: ${data[chatId].mode}`
    }, { quoted: message });
}

// Detection logic
async function handleAntiMention(sock, chatId, message, senderId) {
    let data = loadData();
    if (!data[chatId] || !data[chatId].enabled) return;

    const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    // Detect mass mention (3+ mentions OR @all text)
    const text =
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        '';

    const isMassMention =
        mentioned.length >= 3 ||
        text.includes('@all') ||
        text.includes('@everyone');

    if (!isMassMention) return;

    // Delete message
    try {
        await sock.sendMessage(chatId, {
            delete: message.key
        });
    } catch (e) {}

    // Initialize warnings
    if (!data[chatId].warnings[senderId]) {
        data[chatId].warnings[senderId] = 0;
    }

    // Mode: instant kick
    if (data[chatId].mode === 'kick') {
        await sock.groupParticipantsUpdate(chatId, [senderId], "remove");

        return sock.sendMessage(chatId, {
            text: `🚫 @${senderId.split('@')[0]} removed for mass mentioning!`,
            mentions: [senderId]
        });
    }

    // Mode: warn
    data[chatId].warnings[senderId] += 1;
    const warnCount = data[chatId].warnings[senderId];

    saveData(data);

    if (warnCount >= 3) {
        await sock.groupParticipantsUpdate(chatId, [senderId], "remove");

        return sock.sendMessage(chatId, {
            text: `🚫 @${senderId.split('@')[0]} removed after 3 warnings!`,
            mentions: [senderId]
        });
    }

    await sock.sendMessage(chatId, {
        text: `⚠️ @${senderId.split('@')[0]} do not mass mention!\nWarning: ${warnCount}/3`,
        mentions: [senderId]
    });
}

module.exports = { antimentionCommand, handleAntiMention };
