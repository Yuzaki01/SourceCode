const discord = require('discord.js');
const client = new discord.Client();
const { token } = require('./config.json')
const fs = require('fs')

client.commands = new discord.Collection();
fs.readdirSync('./commands').forEach(dirs => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for(const files of commandFiles){
        const command = require(`./commands/${dirs}/${files}`);
        console.log(`Memuat file ${files}`);
        client.commands.set(command.name.toLowerCase(), command)
    }
})

const status = [
    "Aku ganteng..",
    "like jika suka dengan video ini",
    "dislike jika tidak suka dengan video ini" // dan seterusnya
]

client.on("ready", () => {
    setInterval(() => {
        const random = status[Math.floor(Math.random() * status.length)]
        
            /* Mengatur status bot */
        client.user.setActivity(random, {
            type: "PLAYING"
        })
    }, 5000) // otomatis mengganti status bot secara random dalam 5 detik.
    console.log("Bot telah online!")
})

        /* MESSAGE EVENT */
client.on("message", async message => {
    if(message.channel.type == 'dm') return;

    const prefix = "y!"

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    if(cmd){
        cmd.execute(client, message, args)
    } else return;
})

client.login(token)