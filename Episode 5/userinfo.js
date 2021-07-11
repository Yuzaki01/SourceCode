const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('id');

module.exports = {
    name: 'userinfo',
    aliases: [],
    description: 'Memberikan informasi pengguna.',
    usage: ['[User]'],

    execute(client, message, args) {
        try {
            const member = message.mentions.members.first() || message.member

            if (member) {
                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setAuthor('User Info')
                    .setTitle(member.user.tag)
                    .addFields(
                        {
                            name: 'Server Nickname',
                            value: member.nickname === null ? "Tidak ada" : member.nickname
                        },
                        {
                            name: 'ID',
                            value: member.user.id
                        },
                        {
                            name: 'Bot',
                            value: member.user.bot === true ? "Ya" : "Bukan"
                        },
                        {
                            name: `Roles (${member._roles.length})`,
                            value: member._roles.length === 0 ? 'Tidak ada' : `<@&${member._roles.slice(0, 20).join(">  <@&")}>`
                        },
                        {
                            name: 'Akun Dibuat Pada',
                            value: `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}`
                        },
                        {
                            name: 'Bergabung Pada',
                            value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}`
                        }
                    )
                    .setFooter(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))

                return message.channel.send(embed);
            } else {
                return message.channel.send('Member tidak ditemukan...')
            }
        } catch (error) {
            console.log(error);
            return message.channel.send('Terjadi kesalahan...');
        }
    }
}