const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

const dbPath = path.join(__dirname, '../data/antiforeign.json');

// ensure file exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}));
}

function getData() {
    return JSON.parse(fs.readFileSync(dbPath));
}

function saveData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// allowed East African codes (you can edit later)
const allowedCodes = ['254', '255', '256', '257', '250'];

async function antiforeign(sock, chatId, senderId, message, args) {
    const isOwner = message.key.fromMe;
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isOwner) {
        if (!isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Please make the bot an admin first.'
            }, { quoted: message });
            return;
        }

        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, {
                text: 'Only group admins can use antiforeign.'
            }, { quoted: message });
            return;
        }
    }

    const data = getData();
    const group = chatId;

    const action = args[0]?.toLowerCase();

    // 🔥 TURN ON
    if (action === 'on') {
        data[group] = true;
        saveData(data);

        await sock.sendMessage(chatId, {
            text: '🌍 Anti-foreign is now ENABLED.\nOnly East African numbers are allowed.'
        }, { quoted: message });
        return;
    }

    // 🔥 TURN OFF
    if (action === 'off') {
        data[group] = false;
        saveData(data);

        await sock.sendMessage(chatId, {
            text: '🌍 Anti-foreign is now DISABLED.'
        }, { quoted: message });
        return;
    }

    // status
    const status = data[group] ? 'ON 🟢' : 'OFF 🔴';

    await sock.sendMessage(chatId, {
        text: `🌍 Anti-foreign status: ${status}\n\nUsage:\n.antiforeign on\n.antiforeign off`
    }, { quoted: message });
}

module.exports = antiforeign;
