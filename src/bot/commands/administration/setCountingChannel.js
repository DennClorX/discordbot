const { MessageFlags } = require('discord.js');
const config = require('../../config.json');
const guildSchema = require('../../../schemas/index.js');

module.exports = {
    permission: "ManageGuild",
    data: {
        name: 'setcountingchannel',
        description: 'Set the counting channel for the server.',
        options: [
            {
                name: 'channel',
                description: 'The channel to set as the counting channel.',
                type: 7, // Channel type
                channelTypes: [0, 5], // GUILD_TEXT, GUILD_NEWS
                required: true,
            },
        ],
    },
    async run(client, interaction) {
        const channel = interaction.options.getChannel('channel');

        const data = await guildSchema.findOneAndUpdate({ guildId: interaction.guild.id }, {
            counterChannelId: channel.id,
            counterNumber: 0,
        });

        if (!data) {
            await guildSchema.create({
                guildId: interaction.guild.id,
                counterChannelId: channel.id,
                counterNumber: 0,
            })
        }
        
        await interaction.reply({
            embeds: [{
                description: `${config.emojis.succesEmoji} Se ha establecido el canal: <#${channel.id}>`,
                color: config.colors.successColor
            }], flags: MessageFlags.Ephemeral
        });
    }
}