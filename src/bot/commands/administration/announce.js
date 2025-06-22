const config = require('../../config.json');
const { MessageFlags } = require('discord.js');

module.exports = {
    permission: "ManageGuild",
    data: {
        name: 'announce',
        description: 'Send an announcement to the server.',
        options: [
            {
                name: "text",
                description: "Sends a message on plain text",
                type: 1,//SUB_COMMAND
                options: [
                    {
                        name: "channel",
                        description: "Channel where the announcement will be sent",
                        type: 7, // CHANNEL
                        channelTypes: [0, 5], // GUILD_TEXT, GUILD_NEWS
                        required: true,
                    },
                    {
                        type: 3, // STRING
                        name: 'message',
                        description: 'Message to send',
                        required: true,
                    },
                ],
            },
            {
                name: "embed",
                description: "Sends an embed to the channel",
                type: 1,//SUB_COMMAND
                options: [
                    {
                        name: "channel",
                        description: "Channel where the announcement will be sent",
                        type: 7, // CHANNEL
                        channelTypes: [0, 5], // GUILD_TEXT, GUILD_NEWS
                        required: true,
                    },
                    {
                        name: "description",
                        description: "Description of the embed",
                        type: 3,//STRING
                        required: true,
                    },
                    {
                        name: "title",
                        description: "Title of the embed",
                        type: 3//STRING
                    },
                    {
                        name: "authorname",
                        description: "Name of the author of the embed",
                        type: 3//STRING
                    },
                    {
                        name: "authoricon",
                        description: "Icon of the author of the embed",
                        type: 3//STRING
                    },
                    {
                        name: "thumbnail",
                        description: "Thumbnail of the embed",
                        type: 3//STRING
                    },
                    {
                        name: "footer",
                        description: "Footer of the embed",
                        type: 3//STRING
                    },
                    {
                        name: "color",
                        description: "Color of the embed (hex code)",
                        type: 3//STRING
                    }
                    ,]
            },
        ],
    },
    async run(client, interaction) {
        const channel = await interaction.options.getChannel('channel')
        if (await interaction.options.getSubcommand() === 'embed') {

            await channel.send({
                embeds: [{
                    title: await interaction.options.getString('title'),
                    description: await interaction.options.getString('description'),
                    author: { name: await interaction.options.getString('authorname'), url: await interaction.options.getString('authoricon') },
                    thumbnail: { url: await interaction.options.getString('thumbnail') },
                    footer: { text: await interaction.options.getString('footer') },
                    color: await interaction.options.getString('color')
                }]
            })

            await interaction.reply({
                embeds: [{
                    description: `${config.emojis.succesEmoji} Anuncio enviado a: <#${channel.id}>`,
                    color: config.colors.succesColor
                }], flags: MessageFlags.Ephemeral
            })

        } else {
            channel.send({
                content: await interaction.options.getString('message')
            })

            await interaction.reply({
                embeds: [{
                    description: `${config.emojis.succesEmoji} Anuncio enviado a: <#${channel.id}>`,
                    color: config.colors.succesColor
                }], flags: MessageFlags.Ephemeral
            })
        }
    }
}