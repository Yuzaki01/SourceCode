module.exports = {
    name: 'say',
    aliases: [],
    description: 'Membuat bot berbicara mengikuti argumen kamu.',
    usage: ['[Teks]'],

execute(client, message, args){
    const kata = args.join(" ");
    if(kata){
        message.channel.send(kata)
    } else {
        message.channel.send('Mohon masukkan setidaknya 1 kata.')
    }
}
}