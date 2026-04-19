async function restartCommand(sock, chatId, message) {
    try {
        await sock.sendMessage(chatId, {
            text: "♻️ Restarting bot..."
        }, { quoted: message });

        console.log("♻️ Bot restarting...");

        // Give time to send message before exit
        setTimeout(() => {
            process.exit(1); // triggers restart if using PM2 / panel / nodemon
        }, 1500);

    } catch (err) {
        console.log("Restart Error:", err);
    }
}

module.exports = restartCommand;
