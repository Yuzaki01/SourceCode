module.exports = {
    name: 'avatar',
    aliases: ['pp', 'pfp'],

execute(client, message, args){
    const target = message.mentions.users.first() || message.author
    const avatar = target.displayAvatarURL({
        size: 4096,
        format: 'png',
        dynamic: true
    })

    message.channel.send(avatar)
}
}