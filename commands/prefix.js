const fs = require('fs');
const path = require('path');
const isOwnerOrSudo = require('../lib/isOwner');

const configPath = path.join(__dirname, '..', 'data', 'config.json');

// Initialize config if missing
function initConfig() {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({ prefix: '.' }, null, 2));
    }
    return JSON.parse(fs.readFileSync(configPath));
}

async function setPrefixCommand(sock, chatId, message) {
    try {
        const senderId = message.key.participant || message.key.remoteJid;
        const isOwner = await isOwnerOrSudo(senderId, sock, chatId);

        // Permission check
        if (!message.key.fromMe && !isOwner) {
            return sock.sendMessage(chatId, {
                text: '❌ Only owner can change prefix!'
            }, { quoted: message });
        }

        // Get args
        const text = message.message?.conversation || 
                     message.message?.extendedTextMessage?.text || '';
        const args = text.trim().split(' ').slice(1);
        const newPrefix = args[0];

        if (!newPrefix) {
            return sock.sendMessage(chatId, {
                text: '❌ Usage: setprefix <new_prefix>\nExample: setprefix !'
            }, { quoted: message });
        }

        if (newPrefix.length > 3) {
            return sock.sendMessage(chatId, {
                text: '❌ Prefix too long! Max 3 characters.'
            }, { quoted: message });
        }

        // Load config
        const config = initConfig();

        // Save new prefix
        config.prefix = newPrefix;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        await sock.sendMessage(chatId, {
            text: `✅ Prefix changed to: *${newPrefix}*`
        }, { quoted: message });

    } catch (err) {
        console.error('Error changing prefix:', err);
        await sock.sendMessage(chatId, {
            text: '❌ Error changing prefix!'
        }, { quoted: message });
    }
}

module.exports = setPrefixCommand;
