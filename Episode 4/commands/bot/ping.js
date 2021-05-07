module.exports = {
    name: 'ping',
    aliases: ['pong'],

execute(client, message, args){
    message.channel.send(`Pong: ${client.ws.ping}ms`)
}
}