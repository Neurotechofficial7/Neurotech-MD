const axios = require("axios");

const apikey = "gifted";

async function fetch(url) {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (e) {
        return null;
    }
}

// ⚽ Livescore 2
async function livescore2(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/livescore2?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch livescore2." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "⚽ *LIVESCORE 2*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🔮 Predictions
async function predictions(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/predictions?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch predictions." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🔮 *PREDICTIONS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 📰 News
async function news(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/news?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed to fetch news." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "📰 *FOOTBALL NEWS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 👤 Player Search
async function playerSearch(sock, chatId, message, args) {
    const name = args.join(" ");
    if (!name) return sock.sendMessage(chatId, { text: "❗ Usage: .player Messi" }, { quoted: message });

    const url = `https://api.giftedtech.co.ke/api/football/player-search?apikey=${apikey}&name=${encodeURIComponent(name)}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Player not found." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: `👤 *PLAYER: ${name}*\n\n` + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🏟 Team Search
async function teamSearch(sock, chatId, message, args) {
    const name = args.join(" ");
    if (!name) return sock.sendMessage(chatId, { text: "❗ Usage: .team Arsenal" }, { quoted: message });

    const url = `https://api.giftedtech.co.ke/api/football/team-search?apikey=${apikey}&name=${encodeURIComponent(name)}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Team not found." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: `🏟 *TEAM: ${name}*\n\n` + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🏆 EPL Standings
async function eplStandings(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/epl/standings?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed EPL standings." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🏆 *EPL STANDINGS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// ⚽ EPL Scorers
async function eplScorers(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/epl/scorers?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed EPL scorers." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "⚽ *EPL TOP SCORERS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 📅 EPL Matches
async function eplMatches(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/epl/matches?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed EPL matches." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "📅 *EPL MATCHES*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🇪🇸 La Liga Standings
async function laliga(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/laliga/standings?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed La Liga standings." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🇪🇸 *LA LIGA STANDINGS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

// 🇩🇪 Bundesliga Standings
async function bundesliga(sock, chatId, message) {
    const url = `https://api.giftedtech.co.ke/api/football/bundesliga/standings?apikey=${apikey}`;
    const data = await fetch(url);

    if (!data || data.success === false) {
        return sock.sendMessage(chatId, { text: "❌ Failed Bundesliga standings." }, { quoted: message });
    }

    return sock.sendMessage(chatId, {
        text: "🇩🇪 *BUNDESLIGA STANDINGS*\n\n" + JSON.stringify(data, null, 2)
    }, { quoted: message });
}

module.exports = {
    livescore2,
    predictions,
    news,
    playerSearch,
    teamSearch,
    eplStandings,
    eplScorers,
    eplMatches,
    laliga,
    bundesliga
};
