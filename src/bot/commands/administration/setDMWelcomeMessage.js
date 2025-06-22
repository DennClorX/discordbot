const { MessageFlags } = require('discord.js');
const config = require('../../config.json');
const guildSchema = require('../../../schemas/index.js');

module.exports = {
    permission: "ManageGuild",
    data: {
        name: 'setdmwelcomemessage',
        description: 'Set the welcome message for new members in DMs.',
        options: [
            {
                name: "text",
                description: "Sends a message on plain text",
                type: 1,//SUB_COMMAND
                options: [
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
                        name: "description",
                        description: "Description of the embed",
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
        const title = interaction.options.getString('title')
        const authorName = interaction.options.getString('authorname')
        const authorIcon = interaction.options.getString('authoricon')
        const description = interaction.options.getString('description')
        const thumbnail = interaction.options.getString('thumbnail')
        const footer = interaction.options.getString('footer')
        const color = interaction.options.getString('color')
        const message = interaction.options.getString('message')

        const data = await guildSchema.findOneAndUpdate({ guildId: interaction.guildId }, {
            welcomeDMTitle: title,
            welcomeDMDescription: description,
            welcomeDMAuthorName: authorName,
            welcomeDMAuthorIcon: authorIcon,
            welcomeDMThumbnail: thumbnail,
            welcomeDMFooter: footer,
            welcomeDMColor: color,
        })
        if (!data) {
            await guildSchema.create({
                guildId: interaction.guildId,
                welcomeDMTitle: title,
                welcomeDMDescription: description,
                welcomeDMAuthorName: authorName,
                welcomeDMAuthorIcon: authorIcon,
                welcomeDMThumbnail: thumbnail,
                welcomeDMFooter: footer,
                welcomeDMColor: color,
            })
        }
        await interaction.reply({
            content: `${config.emojis.succesEmoji} This would be the preview of the embed!`, embeds: [{
                title: title,
                description: description,
                author: { name: authorName, url: authorIcon },
                thumbnail: { url: thumbnail },
                footer: { text: footer },
                color: color
            }], flags: MessageFlags.Ephemeral
        })
    }
}