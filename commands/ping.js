async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();

        // Send temporary message
        const sent = await sock.sendMessage(chatId, {
            text: 'Testing speed...'
        }, { quoted: message });

        const end = Date.now();
        const speed = end - start;

        // Edit message with result
        await sock.sendMessage(chatId, {
            text: `🚀 *NEUROTECH-MD SPEED:* ${speed} ms`
        }, { quoted: message });

    } catch (error) {
        console.error('Ping Error:', error);

        await sock.sendMessage(chatId, {
            text: '❌ Failed to check speed.'
        }, { quoted: message });
    }
}

module.exports = pingCommand;
