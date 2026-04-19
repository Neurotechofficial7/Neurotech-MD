const mumaker = require('mumaker');

// Simple message templates (NO channel forwarding)
const messageTemplates = {
    error: (message) => ({
        text: message
    }),
    success: (text, imageUrl) => ({
        image: { url: imageUrl },
        caption: `✅ Generated: ${text}`
    })
};

async function textmakerCommand(sock, chatId, message, args, command) {
    try {

        // Get text properly
        const text = args.join(' ');

        if (!text) {
            return await sock.sendMessage(chatId, messageTemplates.error(
                `❗ Please provide text\nExample: .${command} Nick`
            ), { quoted: message });
        }

        let result;

        switch (command) {
            case 'metallic':
                result = await mumaker.ephoto("https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html", text);
                break;
            case 'ice':
                result = await mumaker.ephoto("https://en.ephoto360.com/ice-text-effect-online-101.html", text);
                break;
            case 'snow':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-a-snow-3d-text-effect-free-online-621.html", text);
                break;
            case 'impressive':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html", text);
                break;
            case 'matrix':
                result = await mumaker.ephoto("https://en.ephoto360.com/matrix-text-effect-154.html", text);
                break;
            case 'light':
                result = await mumaker.ephoto("https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html", text);
                break;
            case 'neon':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html", text);
                break;
            case 'devil':
                result = await mumaker.ephoto("https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html", text);
                break;
            case 'purple':
                result = await mumaker.ephoto("https://en.ephoto360.com/purple-text-effect-online-100.html", text);
                break;
            case 'thunder':
                result = await mumaker.ephoto("https://en.ephoto360.com/thunder-text-effect-online-97.html", text);
                break;
            case 'leaves':
                result = await mumaker.ephoto("https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html", text);
                break;
            case '1917':
                result = await mumaker.ephoto("https://en.ephoto360.com/1917-style-text-effect-523.html", text);
                break;
            case 'arena':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html", text);
                break;
            case 'hacker':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", text);
                break;
            case 'sand':
                result = await mumaker.ephoto("https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html", text);
                break;
            case 'blackpink':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html", text);
                break;
            case 'glitch':
                result = await mumaker.ephoto("https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html", text);
                break;
            case 'fire':
                result = await mumaker.ephoto("https://en.ephoto360.com/flame-lettering-effect-372.html", text);
                break;
            default:
                return sock.sendMessage(chatId, {
                    text: "❌ Invalid text generator command"
                }, { quoted: message });
        }

        if (!result || !result.image) {
            throw new Error('No image returned');
        }

        await sock.sendMessage(chatId, messageTemplates.success(text, result.image), { quoted: message });

    } catch (error) {
        console.error(error);
        await sock.sendMessage(chatId, {
            text: "❌ Failed to generate image. Try again later."
        }, { quoted: message });
    }
}

module.exports = textmakerCommand;
