const { MessageEmbed } = require('discord.js');
const kbbi = require('kbbi-scraper');

module.exports = {
    name: 'kbbi',
    aliases: [],
    description: 'Kamus besar bahasa indonesia',
    usage: ['[Kata]'],

execute(client, message, args){
    const kata = args.join(' ');

    if(!kata) return message.reply('Mohon masukkan kata.')
    else {
        kbbi(kata).then(res => {
            const embed = new MessageEmbed()
                .setTitle(res.data.title)
                .setDescription(res.data.arti)
                .setColor('BLUE')

                return message.channel.send(embed);
        }).catch(e => {
            const errorEmbed = new MessageEmbed()
                .setTitle(kata)
                .setDescription('Kata yang dimasukkan tidak ditemukan...')
                .setColor('BLUE')

                return message.channel.send(errorEmbed);
        })
    }
}
}