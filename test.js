const { MessageEmbed } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'help',
    aliases: ['h', 'cmd'],
    description: 'Menampilkan seluruh command yang tersedia',
    usage: ['[Nama Command]'],

execute(client, message, args){
    const commandName = args[0]

    if(!commandName){
        let kategori = [];
        fs.readdirSync('./commands/').forEach((dir) => {
            const direc = fs.readdirSync(`./commands/${dir}`).filter(files => files.endsWith('.js'))

            const commands = direc.map(cmd => {
                const file = require(`../../commands/${dir}/${cmd}`)

                const name = file.name.replace('.js', '');
                return name;
            });

            let data = new Object();

            data = {
                name: dir.charAt(0).toUpperCase()+dir.slice(1).toLowerCase(),
                value: commands.length == 0 ? 'Command tidak ada..' : commands.join(' | ')
            };

            kategori.push(data)
        });

        const helpEmbed = new MessageEmbed()
            .setAuthor('Command List', client.user.displayAvatarURL())
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(kategori)
            .addField('\u200B', `Gunakan command y!help [Nama Command] untuk melihat info detail dari command tersebut`)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

            message.channel.send(helpEmbed)
    } else {
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return message.reply('Command tidak ditemukan..');
        else {
            const helpCommandEmbed = new MessageEmbed()
                .setAuthor('Help Command', client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('BLUE')
                .addField('Nama Command', command.name)
                .addField('Alias', command.aliases.join(' | '))
                .addField('Deskripsi', command.description)
                .addField('Penggunaan', command.usage.length !== 0 ? 'y!'+command.name+' '+command.usage : 'y!'+command.name)

                message.channel.send(helpCommandEmbed)
        }
    }
}
}
