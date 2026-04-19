const axios = require('axios');

const API_KEY = 'gifted';

async function run(sock, chatId, message, args, command) {
    try {
        const url = args[0];
        const url2 = args[1];
        const url3 = args[2];
        const url4 = args[3];
        const url5 = args[4];

        if (!url) {
            return sock.sendMessage(chatId, {
                text: `❗ Please provide an image URL.\n\nExample: .${command} https://image.png`
            }, { quoted: message });
        }

        let apiUrl = '';

        switch (command) {

            case 'skydiver':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/skydiver?apikey=${API_KEY}&url=${url}`;
                break;

            case 'billboards-at-night':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/billboards-at-night?apikey=${API_KEY}&url=${url}&url2=${url2}`;
                break;

            case 'underground-poster':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/underground-poster?apikey=${API_KEY}&url=${url}`;
                break;

            case 'broadway-at-night':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/broadway-at-night?apikey=${API_KEY}&url=${url}&url2=${url2}`;
                break;

            case 'country-house':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/country-house?apikey=${API_KEY}&url=${url}&url2=${url2}`;
                break;

            case 'calendar':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/calendar?apikey=${API_KEY}&url=${url}`;
                break;

            case 'smoke-flare':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/smoke-flare?apikey=${API_KEY}&url=${url}`;
                break;

            case 'mirror':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/mirror?apikey=${API_KEY}&url=${url}`;
                break;

            case 'analogue-tv':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/analogue-tv?apikey=${API_KEY}&url=${url}`;
                break;

            case 'old-camera':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/old-camera?apikey=${API_KEY}&url=${url}`;
                break;

            case 'love-letter':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/love-letter?apikey=${API_KEY}&url=${url}`;
                break;

            case 'black-white-gallery':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/black-white-gallery?apikey=${API_KEY}&url=${url}&url2=${url2}&url3=${url3}&url4=${url4}&url5=${url5}`;
                break;

            case 'drawing-photo':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/drawing-photo?apikey=${API_KEY}&url=${url}`;
                break;

            case 'photo_gallery':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/photo_gallery?apikey=${API_KEY}&url=${url}&url2=${url2}&url3=${url3}`;
                break;

            case 'streets_of_new_york':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/streets_of_new_york?apikey=${API_KEY}&url=${url}&url2=${url2}`;
                break;

            case 'reading_on_the_balcony':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/reading_on_the_balcony?apikey=${API_KEY}&url=${url}&url2=${url2}&url3=${url3}`;
                break;

            case 'crown':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/crown?apikey=${API_KEY}&url=${url}`;
                break;

            case 'frame_and_roses':
                apiUrl = `https://api.giftedtech.co.ke/api/photofunia/frame_and_roses?apikey=${API_KEY}&url=${url}`;
                break;

            default:
                return sock.sendMessage(chatId, {
                    text: `❌ Unknown command: ${command}`
                }, { quoted: message });
        }

        const res = await axios.get(apiUrl);

        const result = res.data?.result || res.data?.image || res.data?.url;

        if (!result) {
            return sock.sendMessage(chatId, {
                text: '❌ Failed to generate image.'
            }, { quoted: message });
        }

        await sock.sendMessage(chatId, {
            image: { url: result },
            caption: `✅ *PhotoFunia Result*`
        }, { quoted: message });

    } catch (error) {
        console.log(error);
        sock.sendMessage(chatId, {
            text: '❌ Error processing request.'
        }, { quoted: message });
    }
}

module.exports = run;

case 'graffiti_text':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/graffiti_text?apikey=${API_KEY}&text=${encodeURIComponent(url)}&signature=${encodeURIComponent(url2 || url)}`;
    break;

case 'number-plate':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/number-plate?apikey=${API_KEY}&text=${encodeURIComponent(url)}`;
    break;

case 'typewriter':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/typewriter?apikey=${API_KEY}&text=${encodeURIComponent(url)}`;
    break;

case 'led-road-sign':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/led-road-sign?apikey=${API_KEY}&text=${encodeURIComponent(url)}&sign=${encodeURIComponent(url2 || url)}`;
    break;

case 'arrow-signs':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/arrow-signs?apikey=${API_KEY}&text1=${encodeURIComponent(url)}&text2=${encodeURIComponent(url2 || url)}`;
    break;

case 'neon-writing':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/neon-writing?apikey=${API_KEY}&text=${encodeURIComponent(url)}&text2=${encodeURIComponent(url2 || url)}`;
    break;

case 'beach-sign':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/beach-sign?apikey=${API_KEY}&text=${encodeURIComponent(url)}`;
    break;

case 'christmas-writing':
    apiUrl = `https://api.giftedtech.co.ke/api/photofunia/christmas-writing?apikey=${API_KEY}&text=${encodeURIComponent(url)}`;
    break;
