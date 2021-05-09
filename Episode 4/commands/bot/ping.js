module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Memeriksa kecepatan ping bot.',
    usage: [],

execute(client, message, args){
    message.channel.send(`Pong: ${client.ws.ping}ms`)
}
}