const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('id');

module.exports = {
    name: 'serverinfo',
    aliases: [],
    description: 'Memberikan informasi server.',
    usage: [],

    execute(client, message, args) {
        const guildIcon = message.guild.iconURL({ dynamic: true })

        const embed = new MessageEmbed()
            .setAuthor('Server Info')
            .setTitle(message.guild.name)
            .setThumbnail(guildIcon)
            .setColor('BLUE')
            .addFields(
                {
                    name: 'Owner',
                    value: message.guild.owner.user.tag,
                },
                {
                    name: 'ID',
                    value: message.guild.id,
                    inline: true
                },
                {
                    name: 'Wilayah',
                    value: message.guild.region
                },
                {
                    name: 'Statistik',
                    value: `Member: ${message.guild.members.cache.filter(u => !u.user.bot).size}\nBot: ${message.guild.members.cache.filter(u => u.user.bot).size}\nRole: ${message.guild.roles.cache.size}\nChannel: ${message.guild.channels.cache.size}`,
                },
                {
                    name: 'Tanggal Dibuat',
                    value: moment(message.guild.createdAt).format("dddd, MMMM Do YYYY, hh:mm a"),
                }
            )
            .setFooter(message.guild.name, guildIcon);

        message.channel.send(embed);

    }
}