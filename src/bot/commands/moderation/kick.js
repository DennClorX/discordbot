const { MessageFlags } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
    permission: "KickMembers",
    data: {
        name: 'kick',
        description: 'Kick a user from the server',

        options: [
            {
                name: "user",
                description: "User to kick",
                type: 6, // User
                required: true,
            },
            {
                name: "reason",
                description: "Reason for the kick",
                type: 3, // String
                required: true,
            },
        ]
    },

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const author = interaction.user;

        ////////////
        // CHECKS //
        ////////////

        if (user.id === interaction.user.id) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} You cannot kick yourself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (user.id === client.user.id) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot kick myself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.me.roles.highest.position <= interaction.guild.members.cache.get(user.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot kick this user because they have a higher role than me.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.cache.get(user.id).roles.highest.position >= interaction.guild.members.cache.get(author.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} You cannot kick this user because they have a higher role than you.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }

        ///////////////
        // KICK USER //
        ///////////////

        await user.send({
            embeds: [{
                description: `You have been kicked from **${interaction.guild.name}**.\nReason: ${reason}`,
                color: config.colors.errorColor
            }]
        })
        await interaction.guild.members.kick(user, { reason });
        await interaction.reply({
            embeds: [{
                description: `${config.emojis.successEmoji} User <@${user.id}> has been kicked from the server.\nReason: ${reason}`,
                color: config.colors.successColor
            }], flags: MessageFlags.Ephemeral
        });


    }
}