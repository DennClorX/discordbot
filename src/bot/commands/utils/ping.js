module.exports = {
    permission: "",
    data: {
        name: 'ping',
        description: 'Check the bot\'s latency.',
    },

    async run(client, interaction) {
        interaction.channel.send({
            content: (`Loading...`),
            ephemeral: true
        }).then(m => {
            m.edit(`🏓 Pong! \nBot Latency is \`${Math.round(m.createdTimestamp - interaction.createdTimestamp)}ms\`\nAPI Latency is \`${Math.round(client.ws.ping)}ms\`.`);
        })
    }
}