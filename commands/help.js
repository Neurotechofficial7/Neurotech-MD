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
   *𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.add
║ ✦.antilink
║ ✦.antibadword
║ ✦.antiforeign
║ ✦.antigroupmention
║ ✦.antitag
║ ✦.approveall
║ ✦.ban
║ ✦.clear
║ ✦.demote
║ ✦.delete
║ ✦.hidetag
║ ✦.invite
║ ✦.kick
║ ✦.leave
║ ✦.mute
║ ✦.promote
║ ✦.rejectall
║ ✦.resetlink
║ ✦.setgdesc
║ ✦.setgname
║ ✦.setgpp
║ ✦.tag
║ ✦.tagall
║ ✦.tagnotadmin
║ ✦.unmute
║ ✦.warn
║ ✦.warnings
║ ✦.welcome
║ ✦.goodbye
║ ✦.chatbot
╚═══════════════════╝

╔═══════════════════╗
   *𝗔𝗡𝗜𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.cry
║ ✦.facepalm
║ ✦.hug
║ ✦.kiss
║ ✦.konachan
║ ✦.neko
║ ✦.nom
║ ✦.pat
║ ✦.poke
║ ✦.randomanime
║ ✦.waifu
║ ✦.wink
╚═══════════════════╝

╔═══════════════════╗
   *𝗖𝗛𝗔𝗧 𝗔𝗜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.deepseek
║ ✦.gemini
║ ✦.gpt
║ ✦.gpt4o
║ ✦.letmegpt
║ ✦.unlimitedai
╚═══════════════════╝

╔═══════════════════╗
   *𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.facebook
║ ✦.gitclone
║ ✦.gdrivedl
║ ✦.instagram
║ ✦.mediafire
║ ✦.pinterestv3
║ ✦.play
║ ✦.song
║ ✦.snackdl
║ ✦.spotify
║ ✦.tiktok
║ ✦.twitterdlv2
║ ✦.video
║ ✦.ytmp3
║ ✦.ytmp4
║ ✦.ytvideo
╚═══════════════════╝

╔═══════════════════╗
   *𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.advice
║ ✦.boyfriendsday
║ ✦.character
║ ✦.christmas
║ ✦.compliment
║ ✦.dare
║ ✦.fathersday
║ ✦.flirt
║ ✦.friendship
║ ✦.goodnight
║ ✦.gratitude
║ ✦.halloween
║ ✦.heartbreak
║ ✦.joke
║ ✦.love
║ ✦.mothersday
║ ✦.newyear
║ ✦.pickupline
║ ✦.roseday
║ ✦.shayari
║ ✦.simp
║ ✦.stupid
║ ✦.thankyou
║ ✦.valentine
║ ✦.wasted
╚═══════════════════╝

╔═══════════════════╗
   *𝗚𝗘𝗡𝗘𝗥𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.alive
║ ✦.admins
║ ✦.attp
║ ✦.fact
║ ✦.groupinfo
║ ✦.jid
║ ✦.joke
║ ✦.lyrics
║ ✦.menu
║ ✦.news
║ ✦.owner
║ ✦.ping
║ ✦.quote
║ ✦.restart
║ ✦.setprefix
║ ✦.screenshot
║ ✦.tts
║ ✦.translate
║ ✦.url
║ ✦.vv
║ ✦.weather
╚═══════════════════╝

╔═══════════════════╗
   *𝗚𝗔𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.answer 
║ ✦.dare
║ ✦.guess 
║ ✦.hangman 
║ ✦.trivia
║ ✦.truth 
║ ✦.tictactoe 
╚═══════════════════╝

╔═══════════════════╗
   *𝗚𝗜𝗧𝗛𝗨𝗕 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.git
║ ✦.github
║ ✦.repo
║ ✦.sc
║ ✦.script
╚═══════════════════╝

╔═══════════════════╗
   *𝗜𝗠𝗔𝗚𝗘 & 𝗦𝗧𝗜𝗖𝗞𝗘𝗥*:
║ ✦.blur
║ ✦.crop
║ ✦.emojimix
║ ✦.igs
║ ✦.igsc
║ ✦.meme
║ ✦.remini
║ ✦.removebg
║ ✦.simage
║ ✦.sticker
║ ✦.take
║ ✦.tgsticker
╚═══════════════════╝

╔═══════════════════╗
   *𝗜𝗠𝗔𝗚𝗘/𝗩𝗜𝗗𝗘𝗢 𝗔𝗜*:
║ ✦.deepimg
║ ✦.flux
║ ✦.magicstudio
║ ✦.sora
║ ✦.veo3
╚═══════════════════╝

╔═══════════════════╗
   *𝗠𝗜𝗦𝗖 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.circle
║ ✦.comrade
║ ✦.gay
║ ✦.glass
║ ✦.horny
║ ✦.its-so-stupid
║ ✦.jail
║ ✦.lolice
║ ✦.lgbt
║ ✦.namecard
║ ✦.oogway
║ ✦.passed
║ ✦.triggered
║ ✦.tweet
║ ✦.ytcomment
╚═══════════════════╝

╔═══════════════════╗
   *𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.anticall
║ ✦.antidelete
║ ✦.autoread
║ ✦.autoreact
║ ✦.autostatus
║ ✦.autostatus react
║ ✦.autostatusdownload
║ ✦.autotyping
║ ✦.block
║ ✦.clearsession
║ ✦.cleartmp
║ ✦.mention
║ ✦.mode
║ ✦.pmblocker
║ ✦.setmention
║ ✦.setpp
║ ✦.settings
║ ✦.update
╚═══════════════════╝

╔═══════════════════╗
   *𝗣𝗛𝗢𝗧𝗢𝗙𝗨𝗡𝗜𝗔 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.analogue-tv
║ ✦.billboards-at-night
║ ✦.black-white-gallery
║ ✦.broadway-at-night
║ ✦.calendar
║ ✦.country-house
║ ✦.crown
║ ✦.drawing-photo
║ ✦.frame_and_roses
║ ✦.love-letter
║ ✦.mirror
║ ✦.old-camera
║ ✦.photo_gallery
║ ✦.reading_on_the_balcony
║ ✦.smoke-flare
║ ✦.skydiver
║ ✦.streets_of_new_york
║ ✦.underground-poster
╚═══════════════════╝

╔═══════════════════╗
   *𝗣𝗛𝗢𝗧𝗢𝗙𝗨𝗡𝗜𝗔 𝗧𝗘𝗫𝗧*:
║ ✦.arrow-signs
║ ✦.beach-sign
║ ✦.christmas-writing
║ ✦.graffiti_text
║ ✦.led-road-sign
║ ✦.neon-writing
║ ✦.number-plate
║ ✦.typewriter
╚═══════════════════╝

╔═══════════════════╗
   *𝗣𝗜𝗘𝗦*:
║ ✦.china
║ ✦.hijab
║ ✦.indonesia
║ ✦.japan
║ ✦.korea
║ ✦.pies
╚═══════════════════╝

╔═══════════════════╗
   *𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.apkmirror
║ ✦.bible
║ ✦.chord
║ ✦.define
║ ✦.dictionary
║ ✦.google
║ ✦.happymod
║ ✦.hearthis
║ ✦.npm
║ ✦.playstore
║ ✦.shazam
║ ✦.soundcloud
║ ✦.wallpaper
║ ✦.wikimedia
╚═══════════════════╝

╔═══════════════════╗
   *𝗦𝗛𝗢𝗥𝗧𝗘𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.adfoc
║ ✦.cleanuri
║ ✦.rebrandly
║ ✦.ssur
║ ✦.tinyurl
║ ✦.vgd
║ ✦.vurl
╚═══════════════════╝

╔═══════════════════╗
   *𝗦𝗣𝗘𝗖𝗜𝗔𝗟/𝗣𝗘𝗥𝗦𝗢𝗡𝗔 𝗔𝗜*:
║ ✦.customai
║ ✦.muslimai
╚═══════════════════╝

╔═══════════════════╗
   *𝗦𝗣𝗢𝗥𝗧𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗*:
║ ✦.allmatches
║ ✦.allstream
║ ✦.basketballstream
║ ✦.basketlive
║ ✦.bundesliga
║ ✦.eplmatches
║ ✦.eplscores
║ ✦.eplstandings
║ ✦.footballstream
║ ✦.laliga
║ ✦.livematches
║ ✦.livescore2
║ ✦.news
║ ✦.player
║ ✦.predictions
║ ✦.sportscategories
║ ✦.stream
║ ✦.streamleagues
║ ✦.team
╚═══════════════════╝

╔═══════════════════╗
   *𝗦𝗧𝗔𝗟𝗞𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.gitstalk
║ ✦.igstalk
║ ✦.ipstalk
║ ✦.npmstalk
║ ✦.tiktokstalk
║ ✦.twitterstalk
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗘𝗠𝗣𝗢𝗥𝗔𝗥𝗬 𝗠𝗔𝗜𝗟*:
║ ✦.checkemail
║ ✦.tempemail
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗘𝗠𝗣𝗢𝗥𝗔𝗥𝗬 𝗠𝗔𝗜𝗟V2*:
║ ✦.tempmailv2 
║ ✦.tempmailv2inbox 
║ ✦.tempmailv2-message 
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗘𝗠𝗣𝗢𝗥𝗔𝗥𝗬 𝗡𝗨𝗠𝗕𝗘𝗥*:
║ ✦.checksms
║ ✦.tempnumber
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗢𝗢𝗟𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.carbon
║ ✦.canvas
║ ✦.checkapikey
║ ✦.clothes
║ ✦.createqr
║ ✦.dbase
║ ✦.dns
║ ✦.encryptv3
║ ✦.enhancer
║ ✦.magiceraser
║ ✦.noiseremover
║ ✦.proxy
║ ✦.readqr
║ ✦.servercheck
║ ✦.songgen
║ ✦.ssphone
║ ✦.upscale
║ ✦.vocalv2
║ ✦.watermark
║ ✦.web2zip
╚═══════════════════╝

╔═══════════════════╗
   *𝗧𝗘𝗫𝗧 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦*:
║ ✦.1917
║ ✦.arena
║ ✦.blackpink
║ ✦.devil
║ ✦.fire
║ ✦.glitch
║ ✦.hacker
║ ✦.ice
║ ✦.impressive
║ ✦.light
║ ✦.leaves
║ ✦.matrix
║ ✦.metallic
║ ✦.neon
║ ✦.purple
║ ✦.sand
║ ✦.snow
║ ✦.thunder
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
