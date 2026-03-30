const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
╔═══════════════════╗
   *🤖 ${settings.botName || 'Neurotech Official'}*  
   ◆Version: *${settings.version || '3.0.0'}*
   ◆Creator: ${settings.botOwner || 'Neurotech Official'}
   ◆Youtube: Neurotech Official 
   ◆Commands: 250 plus
   ◆Maintained: Yes
   ◆Status: Online 
   ◆Mode: Public 
   
╚═══════════════════╝

*Available Commands:*

╔═══════════════════╗
🌐 *❖𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦ .menu
║ ✦.ping
║ ✦.alive
║ ✦.tts 
║ ✦.owner
║ ✦.joke
║ ✦.quote
║ ✦.fact
║ ✦.weather 
║ ✦.news
║ ✦.attp 
║ ✦.lyrics 
║ ✦.groupinfo
║ ✦.admins 
║ ✦.vv
║ ✦.translate 
║ ✦.screenshot 
║ ✦.jid
║ ✦ .url
╚═══════════════════╝ 

╔═══════════════════╗
👮‍♂️ *Admin Commands*:
║ ➤ .ban 
║ ➤ .promote 
║ ➤ .demote 
║ ➤ .mute 
║ ➤ .unmute
║ ➤ .delete 
║ ➤ .kick 
║ ➤ .warnings 
║ ➤ .warn 
║ ➤ .antilink
║ ➤ .antibadword
║ ➤ .clear
║ ➤ .tag 
║ ➤ .tagall
║ ➤ .tagnotadmin
║ ➤ .hidetag 
║ ➤ .chatbot
║ ➤ .resetlink
║ ➤ .antitag 
║ ➤ .welcome 
║ ➤ .goodbye 
║ ➤ .setgdesc 
║ ➤ .setgname 
║ ➤ .setgpp 
╚═══════════════════╝

╔═══════════════════╗
🔒 *Owner Commands*:
║ ➤ .mode 
║ ➤ .clearsession
║ ➤ .antidelete
║ ➤ .cleartmp
║ ➤ .update
║ ➤ .settings
║ ➤ .setpp 
║ ➤ .autoreact 
║ ➤ .autostatus 
║ ➤ .autostatus react 
║ ➤ .autotyping 
║ ➤ .autoread 
║ ➤ .anticall 
║ ➤ .pmblocker 
║ ➤ .pmblocker 
║ ➤ .setmention 
║ ➤ .mention 
╚═══════════════════╝

╔═══════════════════╗
🎨 *Image/Sticker Commands*:
║ ➤ .blur 
║ ➤ .simage 
║ ➤ .sticker 
║ ➤ .removebg
║ ➤ .remini
║ ➤ .crop 
║ ➤ .tgsticker 
║ ➤ .meme
║ ➤ .take  
║ ➤ .emojimix 
║ ➤ .igs 
║ ➤ .igsc 
╚═══════════════════╝  

╔═══════════════════╗
🖼️ *Pies Commands*:
║ ➤ .pies 
║ ➤ .china 
║ ➤ .indonesia 
║ ➤ .japan 
║ ➤ .korea 
║ ➤ .hijab
╚═══════════════════╝

╔═══════════════════╗
🎮 *Game Commands*:
║ ➤ .tictactoe 
║ ➤ .hangman
║ ➤ .guess 
║ ➤ .trivia
║ ➤ .answer 
║ ➤ .truth
║ ➤ .dare
╚═══════════════════╝

╔═══════════════════╗
🤖 *AI Commands*:
║ ➤ .gpt 
║ ➤ .gemini 
║ ➤ .imagine 
║ ➤ .flux 
║ ➤ .sora 
╚═══════════════════╝

╔═══════════════════╗
🎯 *Fun Commands*:
║ ➤ .compliment 
║ ➤ .insult 
║ ➤ .flirt 
║ ➤ .shayari
║ ➤ .goodnight
║ ➤ .roseday
║ ➤ .character 
║ ➤ .wasted 
║ ➤ .ship 
║ ➤ .simp 
║ ➤ .stupid 
╚═══════════════════╝

╔═══════════════════╗
🔤 *Textmaker*:
║ ➤ .metallic 
║ ➤ .ice 
║ ➤ .snow 
║ ➤ .impressive 
║ ➤ .matrix 
║ ➤ .light 
║ ➤ .neon 
║ ➤ .devil 
║ ➤ .purple 
║ ➤ .thunder 
║ ➤ .leaves 
║ ➤ .1917 
║ ➤ .arena 
║ ➤ .hacker 
║ ➤ .sand 
║ ➤ .blackpink 
║ ➤ .glitch 
║ ➤ .fire 
╚═══════════════════╝

╔═══════════════════╗
📥 *Downloader*:
║ ➤ .play 
║ ➤ .song 
║ ➤ .spotify 
║ ➤ .instagram 
║ ➤ .facebook 
║ ➤ .tiktok 
║ ➤ .video 
║ ➤ .ytmp4 
╚═══════════════════╝

╔═══════════════════╗
🧩 *MISC*:
║ ➤ .heart
║ ➤ .horny
║ ➤ .circle
║ ➤ .lgbt
║ ➤ .lolice
║ ➤ .its-so-stupid
║ ➤ .namecard 
║ ➤ .oogway
║ ➤ .tweet
║ ➤ .ytcomment 
║ ➤ .comrade 
║ ➤ .gay 
║ ➤ .glass 
║ ➤ .jail 
║ ➤ .passed 
║ ➤ .triggered
╚═══════════════════╝

╔═══════════════════╗
🖼️ *ANIME*:
║ ➤ .nom 
║ ➤ .poke 
║ ➤ .cry 
║ ➤ .kiss 
║ ➤ .pat 
║ ➤ .hug 
║ ➤ .wink 
║ ➤ .facepalm 
╚═══════════════════╝

╔═══════════════════╗
💻 *Github Commands:*
║ ➤ .git
║ ➤ .github
║ ➤ .sc
║ ➤ .script
║ ➤ .repo
╚═══════════════════╝

Join our channel for updates:`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363421451364996@newsletter',
                        newsletterName: 'Neurotech Official',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363421451364996@newsletter',
                        newsletterName: 'Neurotech Official made by Allamano',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
