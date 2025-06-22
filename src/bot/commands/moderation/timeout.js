const { MessageFlags } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
    permission: "ManageMembers",
    data: {
        name: 'timeout',
        description: 'Timeout a user in the server',

        options: [
            {
                name: "user",
                description: "User to timeout",
                type: 6, // User
                required: true,
            },
            {
                name: "reason",
                description: "Reason for the timeout",
                type: 3, // String
                required: true,
            },
            {
                name: "duration",
                description: "Duration of the timeout (in seconds)",
                type: 4, // Integer
                required: true,
            },
        ]
    },

    async run(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const author = interaction.user;
        const duration = interaction.options.getInteger("duration");

        ////////////
        // CHECKS //
        ////////////

        if (user.id === interaction.user.id) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} You cannot timeout yourself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (user.id === client.user.id) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot timeout myself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.me.roles.highest.position <= interaction.guild.members.cache.get(user.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot timeout this user because they have a higher role than me.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.cache.get(user.id).roles.highest.position >= interaction.guild.members.cache.get(author.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} You cannot timeout this user because they have a higher role than you.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (duration < 1 || duration > 2419200) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} The duration must be between 1 second and 28 days.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }

        //////////////////
        // TIMEOUT USER //
        //////////////////

        await user.timeout(duration * 1000, reason)
        await interaction.reply({
            embeds: [{
                description: `${config.emojis.successEmoji} User <@${user.id}> has been timed out successfully for ${duration} seconds.\nReason: ${reason}`,
                color: config.colors.successColor
            }], flags: MessageFlags.Ephemeral
        });


    }
}