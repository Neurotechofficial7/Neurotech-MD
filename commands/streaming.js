const axios = require("axios");

// 🔑 PUT YOUR API KEY HERE ONCE
const apikey = "gifted";

async function fetchData(url) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        return null;
    }
}

// ⚽ Football Streaming
async function footballStreaming(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/streaming?apikey=${apikey}`;
    const data = await fetchData(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch football streaming." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "⚽ *FOOTBALL STREAMING*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🏀 Basketball Streaming
async function basketballStreaming(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/streaming/basketball?apikey=${apikey}`;
    const data = await fetchData(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch basketball streaming." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🏀 *BASKETBALL STREAMING*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🌍 All Sports Streaming
async function allStreaming(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/streaming/all?apikey=${apikey}`;
    const data = await fetchData(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch all sports streaming." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🌍 *ALL SPORTS STREAMING*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🏆 Streaming Leagues
async function streamingLeagues(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/streaming/leagues?apikey=${apikey}`;
    const data = await fetchData(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch leagues." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🏆 *STREAMING LEAGUES*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🏀 Basketball Livescore
async function basketballLivescore(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/basketball/livescore?apikey=${apikey}`;
    const data = await fetchData(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch basketball livescore." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🏀 *BASKETBALL LIVESCORE*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

module.exports = {
    footballStreaming,
    basketballStreaming,
    allStreaming,
    streamingLeagues,
    basketballLivescore
};
