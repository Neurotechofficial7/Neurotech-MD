const mumaker = require('mumaker');

async function textmakerCommand(sock, chatId, message, args, command) {
    try {

        const text = args.join(' ');

        if (!text) {
            return await sock.sendMessage(chatId, {
                text: `❗ Please provide text\nExample: .${command} Nick`
            }, { quoted: message });
        }

        let result;
        let url;

        switch (command) {
            case 'metallic':
                url = "https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html";
                break;
            case 'ice':
                url = "https://en.ephoto360.com/ice-text-effect-online-101.html";
                break;
            case 'snow':
                url = "https://en.ephoto360.com/create-a-snow-3d-text-effect-free-online-621.html";
                break;
            case 'impressive':
                url = "https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html";
                break;
            case 'matrix':
                url = "https://en.ephoto360.com/matrix-text-effect-154.html";
                break;
            case 'light':
                url = "https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html";
                break;
            case 'neon':
                url = "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html";
                break;
            case 'devil':
                url = "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html";
                break;
            case 'purple':
                url = "https://en.ephoto360.com/purple-text-effect-online-100.html";
                break;
            case 'thunder':
                url = "https://en.ephoto360.com/thunder-text-effect-online-97.html";
                break;
            case 'leaves':
                url = "https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html";
                break;
            case '1917':
                url = "https://en.ephoto360.com/1917-style-text-effect-523.html";
                break;
            case 'arena':
                url = "https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html";
                break;
            case 'hacker':
                url = "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html";
                break;
            case 'sand':
                url = "https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html";
                break;
            case 'blackpink':
                url = "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html";
                break;
            case 'glitch':
                url = "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html";
                break;
            case 'fire':
                url = "https://en.ephoto360.com/flame-lettering-effect-372.html";
                break;

            default:
                return await sock.sendMessage(chatId, {
                    text: "❌ Invalid text generator command"
                }, { quoted: message });
        }

        // 🔥 FIX: use [text]
        result = await mumaker.ephoto(url, [text]);

        const imageUrl = result?.image || result?.url;

        if (!imageUrl) {
            console.log("API RESPONSE:", result);
            return await sock.sendMessage(chatId, {
                text: "❌ Failed to generate image (API error)"
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: `✅ Generated: ${text}`
        }, { quoted: message });

    } catch (error) {
        console.error("FULL ERROR:", error.response?.data || error.message || error);

        await sock.sendMessage(chatId, {
            text: "❌ Failed to generate image. Try again later."
        }, { quoted: message });
    }
}

module.exports = textmakerCommand;
