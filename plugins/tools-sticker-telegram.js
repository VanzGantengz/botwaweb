import { fileTypeFromBuffer } from 'file-type';
import telegramStic from "../lib/scraper/sticker-telegram.js";
import wweb from 'whatsapp-web.js'
const { MessageMedia } = wweb
import fetch from 'node-fetch'
import etc from "../etc.js";

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://t.me/addstickers/shironacry`);
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) return m.reply(`Input URL:\n${usedPrefix + command} https://t.me/addstickers/twohundredthree`);
    let stik = await telegramStic(args[0])
    for (let sticker of stik.result) {
        let buff = await (await fetch(sticker)).buffer()
        await m.reply( new MessageMedia((await fileTypeFromBuffer(buff)).mime, buff.toString("base64")), false, { sendMediaAsSticker: true, stickerName: stik.title || etc.author, stickerAuthor: stik.name || etc.author, stickerCategories: ['😅'] } )
    }
}

handler.help = ['stickertele'].map(v => v + ' <packname>')
handler.tags = ['tools']
handler.command = /^(stic?kertele(gram)?)$/i

handler.private = true

export default handler;