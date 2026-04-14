const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

const filePath = path.join(__dirname, '../data/antigroupmention.json');

// Load data
function loadData() {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath));
}

// Save data
function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function antigroupmentionCommand(sock, chatId, message, senderId, args, isSenderAdmin) {
    if (!chatId.endsWith('@g.us')) {
        return sock.sendMessage(chatId, { text: "❌ Group only command." }, { quoted: message });
    }

    if (!isSenderAdmin) {
        return sock.sendMessage(chatId, { text: "❌ Admin only command." }, { quoted: message });
    }

    let data = loadData();

    if (!data[chatId]) {
        data[chatId] = {
            enabled: false,
            maxWarnings: 3,
            instantKick: false,
            warnings: {}
        };
    }

    const action = args[0];

    if (action === 'on') {
        data[chatId].enabled = true;
    } else if (action === 'off') {
        data[chatId].enabled = false;
    } else if (action === 'instant') {
        data[chatId].instantKick = true;
    } else if (action === 'warn') {
        data[chatId].instantKick = false;
    } else {
        return sock.sendMessage(chatId, {
            text: `⚙️ *Anti Group Mention Settings*

.antigroupmention on/off
.antigroupmention instant (kick immediately)
.antigroupmention warn (use warnings)`
        }, { quoted: message });
    }

    saveData(data);

    sock.sendMessage(chatId, {
        text: "✅ Anti-group-mention updated."
    }, { quoted: message });
}

// 🔥 DETECTION HANDLER
async function handleAntiGroupMention(sock, chatId, message, senderId) {
    const data = loadData();
    if (!data[chatId] || !data[chatId].enabled) return;

    const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    // If many users mentioned (group tag)
    if (mentioned.length < 5) return;

    const groupData = data[chatId];

    const adminStatus = await isAdmin(sock, chatId, senderId);
    if (adminStatus.isSenderAdmin) return;

    if (groupData.instantKick) {
        await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
        return;
    }

    // Warning system
    if (!groupData.warnings[senderId]) groupData.warnings[senderId] = 0;
    groupData.warnings[senderId]++;

    const warnCount = groupData.warnings[senderId];

    if (warnCount >= groupData.maxWarnings) {
        await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
        delete groupData.warnings[senderId];

        await sock.sendMessage(chatId, {
            text: `🚫 User removed for mass mentioning.`
        }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, {
            text: `⚠️ Warning ${warnCount}/${groupData.maxWarnings}\nStop mentioning everyone!`
        }, { quoted: message });
    }

    saveData(data);
}

module.exports = {
    antigroupmentionCommand,
    handleAntiGroupMention
};
