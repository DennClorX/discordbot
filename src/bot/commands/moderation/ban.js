const { MessageFlags } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
    permission: "BanMembers",
    data: {
        name: 'ban',
        description: 'Ban a user from the server',

        options: [
            {
                name: "user",
                description: "User to ban",
                type: 6, // User
                required: true,
            },
            {
                name: "reason",
                description: "Reason for the ban",
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
                    description: `${config.emojis.errorEmoji} You cannot ban yourself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (user.id === client.user.id) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot ban myself.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.me.roles.highest.position <= interaction.guild.members.cache.get(user.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} I cannot ban this user because they have a higher role than me.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }
        if (interaction.guild.members.cache.get(user.id).roles.highest.position >= interaction.guild.members.cache.get(author.id).roles.highest.position) {
            return await interaction.reply({
                embeds: [{
                    description: `${config.emojis.errorEmoji} You cannot ban this user because they have a higher role than you.`,
                    color: config.colors.errorColor
                }], flags: MessageFlags.Ephemeral
            });
        }

        //////////////
        // BAN USER //
        //////////////

        await user.send({
            embeds: [{
                description: `You have been banned from **${interaction.guild.name}**.\nReason: ${reason}`,
                color: config.colors.errorColor
            }]
        })
        await interaction.guild.members.ban(user, { reason });
        await interaction.reply({
            embeds: [{
                description: `${config.emojis.succesEmoji} User <@${user.id}> has been banned successfully.\nReason: ${reason}`,
                color: config.colors.successColor
            }], flags: MessageFlags.Ephemeral
        });


    }
}