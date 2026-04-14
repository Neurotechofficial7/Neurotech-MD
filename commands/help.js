const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
╔═══════════════════╗
      ${settings.botName || 'Neurotech Official'}  
   ◆Version: *${settings.version || '3.0.0'}*
   ◆Creator: ${settings.botOwner || 'Neurotech Official'}
   ◆Youtube: Neurotech Official 
   ◆Commands: 250 plus
   ◆Maintained: Yes
   ◆Status: Online 
   ◆Mode: Public 
   
╚═══════════════════╝

*𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦:*

╔═══════════════════╗
   *𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.menu
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
║ ✦.url
║ ✦.setprefix 
║ ✦.restart  
╚═══════════════════╝ 

╔═══════════════════╗
   *𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.ban 
║ ✦.promote 
║ ✦.demote 
║ ✦.mute 
║ ✦.unmute
║ ✦.delete 
║ ✦.kick 
║ ✦.warnings 
║ ✦.warn 
║ ✦.antilink
║ ✦.antibadword
║ ✦.clear
║ ✦.tag 
║ ✦.tagall
║ ✦.tagnotadmin
║ ✦.hidetag 
║ ✦.chatbot
║ ✦.resetlink
║ ✦.antitag 
║ ✦.welcome 
║ ✦.goodbye 
║ ✦.setgdesc 
║ ✦.setgname 
║ ✦.setgpp 
║ ✦.approveall
║ ✦.rejectall 
║ ✦.add
║ ✦.antigroupmention 
╚═══════════════════╝

╔═══════════════════╗
   *𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.mode 
║ ✦.clearsession
║ ✦.antidelete
║ ✦.cleartmp
║ ✦.update
║ ✦.settings
║ ✦.setpp 
║ ✦.autoreact 
║ ✦.autostatus 
║ ✦.autostatus react 
║ ✦.autotyping 
║ ✦.autoread 
║ ✦.anticall 
║ ✦.pmblocker 
║ ✦.pmblocker 
║ ✦.setmention 
║ ✦.mention 
║ ✦.autostatusdownload 
╚═══════════════════╝

╔═══════════════════╗
   *𝗜𝗠𝗔𝗚𝗘 & 𝗦𝗧𝗜𝗖𝗞𝗘𝗥*:
║ ✦.blur 
║ ✦.simage 
║ ✦.sticker 
║ ✦.removebg
║ ✦.remini
║ ✦.crop 
║ ✦.tgsticker 
║ ✦.meme
║ ✦.take  
║ ✦.emojimix 
║ ✦.igs 
║ ✦.igsc 
╚═══════════════════╝  

╔═══════════════════╗
   *𝗣𝗜𝗘𝗦*:
║ ✦.pies 
║ ✦.china 
║ ✦.indonesia 
║ ✦.japan 
║ ✦.korea 
║ ✦.hijab
╚═══════════════════╝

╔═══════════════════╗
   *𝗚𝗔𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.tictactoe 
║ ✦.hangman
║ ✦.guess 
║ ✦.trivia
║ ✦.answer 
║ ✦.truth
║ ✦.dare
╚═══════════════════╝

╔═══════════════════╗
   *𝗔𝗜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.gpt 
║ ✦.gpt4o 
║ ✦.gemini 
║ ✦.imagine 
║ ✦.flux 
║ ✦.sora 
║ ✦.deepseek 
║ ✦.customai
║ ✦.letmegpt
╚═══════════════════╝

╔═══════════════════╗
   *𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.compliment 
║ ✦.insult 
║ ✦.flirt 
║ ✦.shayari
║ ✦.goodnight
║ ✦.roseday
║ ✦.character 
║ ✦.wasted 
║ ✦.ship 
║ ✦.simp 
║ ✦.stupid 
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗘𝗫𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.metallic 
║ ✦.ice 
║ ✦.snow 
║ ✦.impressive 
║ ✦.matrix 
║ ✦.light 
║ ✦.neon 
║ ✦.devil 
║ ✦.purple 
║ ✦.thunder 
║ ✦.leaves 
║ ✦.1917 
║ ✦.arena 
║ ✦.hacker 
║ ✦.sand 
║ ✦.blackpink 
║ ✦.glitch 
║ ✦.fire 
╚═══════════════════╝

╔═══════════════════╗
   *𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.play 
║ ✦.song 
║ ✦.spotify 
║ ✦.instagram
║ ✦.facebook 
║ ✦.tiktok 
║ ✦.video 
║ ✦.ytmp4 
╚═══════════════════╝

╔═══════════════════╗
   *𝗠𝗜𝗦𝗖 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.heart
║ ✦.horny
║ ✦.circle
║ ✦.lgbt
║ ✦.lolice
║ ✦.its-so-stupid
║ ✦.namecard 
║ ✦.oogway
║ ✦.tweet
║ ✦.ytcomment 
║ ✦.comrade 
║ ✦.gay 
║ ✦.glass 
║ ✦.jail 
║ ✦.passed 
║ ✦.triggered
╚═══════════════════╝

╔═══════════════════╗
   *𝗔𝗡𝗜𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.nom 
║ ✦.poke 
║ ✦.cry 
║ ✦.kiss 
║ ✦.pat 
║ ✦.hug 
║ ✦.wink 
║ ✦.facepalm 
╚═══════════════════╝

╔═══════════════════╗
   *𝗚𝗜𝗧𝗛𝗨𝗕 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦:*
║ ✦.git
║ ✦.github
║ ✦.sc
║ ✦.script
║ ✦.repo
╚═══════════════════╝

✨ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗔𝗟𝗟𝗔𝗠𝗔𝗡𝗢 ✨:`;

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
