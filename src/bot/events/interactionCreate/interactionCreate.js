const config = require('../../config.json');
const { Events, MessageFlags, ChannelType, ButtonStyle, ButtonBuilder, PermissionsBitField, ActionRowBuilder } = require('discord.js');

module.exports = {
    event: Events.InteractionCreate,
    once: false,
    async execute(client, interaction) {
        if (!interaction.isCommand) return;
        //////////////////////
        // Command Handler
        //////////////////////
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        else {
            if (command.permission && !interaction.member.permissions.has(command.permission)) {
                return interaction.reply({
                    embeds: [{
                        description: config.messages.noPermsMessage,
                        color: config.colors.errorColor
                    }],
                    flags: MessageFlags.Ephemeral
                })
            }
            if (command.permission && !interaction.guild.members.me.permissions.has(command.permission)) {
                return interaction.reply({
                    embeds: [{
                        description: config.messages.botNoPermsMessage,
                        color: config.colors.errorColor
                    }],
                    flags: MessageFlags.Ephemeral
                })
            }
            try {
                await command.run(client, interaction);
            } catch (e) {
                
            }
        }
    }
}