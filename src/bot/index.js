import inquirer from "inquirer";
require('dotenv').config();
const { stringToAscii, fonts } = require('asciifyer');
const colorfuller = require('colorfuller')

///////////////////////
// Start up selector 
///////////////////////

setTimeout(() => {
    process.stdin.emit('data', '\n');
}, 10000);
console.clear()
console.log(await colorfuller.effect(await colorfuller.txt(await stringToAscii(`Select the boot type.`, fonts.DOSRebel), "blue")))
const answer = await inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: "Navigate with the arrows ↑↓",
        choices: ['Bot', 'Slash'],
        default: 0,
    }
])

///////////////////////
// Bot        
///////////////////////

if (answer.choice === 'Bot') {
    const { Client, Collection, Partials } = require('discord.js');
    const client = new Client({
        intents: 53608447,
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
            Partials.User,
            Partials.GuildMember
        ]
    })
    client.commands = new Collection()
    require('./handlers/commandHandler.js')(client);
    require('./handlers/eventHandler.js')(client);
    require('mongoose').connect(process.env.MONGO_URL)
    client.login(process.env.TOKEN)

} else {

///////////////////////
// Slash
///////////////////////

    if (answer.choice === 'Slash') {
        const { Routes } = require('discord.js');
        const { REST } = require('@discordjs/rest');
        const commands = []

        require('./handlers/slashCommandPublish.js')(commands)

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands }).then(() => console.log('Successfully registered application commands.'))
        process.exit()
    }
}