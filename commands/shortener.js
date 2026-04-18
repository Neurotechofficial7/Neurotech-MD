const axios = require('axios');

module.exports = async (sock, chatId, message, args, command) => {
    try {
        const url = args[0];

        if (!url) {
    return sock.sendMessage(chatId, {
        text: `❗ Please provide a link.\n\nExample: .${command} https://google.com`
    }, { quoted: message });
        }

        let apiURL = '';

        switch (command) {
            case 'tinyurl':
                apiURL = `https://api.giftedtech.co.ke/api/tools/tinyurl?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'cleanuri':
                apiURL = `https://api.giftedtech.co.ke/api/tools/cleanuri?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'vgd':
                apiURL = `https://api.giftedtech.co.ke/api/tools/vgd?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'rebrandly':
                apiURL = `https://api.giftedtech.co.ke/api/tools/rebrandly?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'vurl':
                apiURL = `https://api.giftedtech.co.ke/api/tools/vurl?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'adfoc':
                apiURL = `https://api.giftedtech.co.ke/api/tools/adfoc?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            case 'ssur':
                apiURL = `https://api.giftedtech.co.ke/api/tools/ssur?apikey=gifted&url=${encodeURIComponent(url)}`;
                break;

            default:
                return;
        }

        const res = await axios.get(apiURL);
        const data = res.data;

        if (!data || !data.result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to shorten URL.'
            }, { quoted: message });
        }

        let msg = `🔗 *URL SHORTENER*\n\n`;
        msg += `🌐 Original: ${url}\n`;
        msg += `⚡ Shortened: ${data.result}\n`;
        msg += `👑 Owner: Neurotech`;

        await sock.sendMessage(chatId, { text: msg }, { quoted: message });

    } catch (err) {
        console.error('SHORTENER ERROR:', err.message);

        await sock.sendMessage(chatId, {
            text: '❌ Error shortening URL.'
        }, { quoted: message });
    }
};
