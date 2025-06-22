const getRandomCat = require('random-cat-img');

module.exports = {
    permission: "",
    data: {
        name: 'cat',
        description: 'Get a random cat image.',
    },

    async run(client, interaction) {
        const catImage = await getRandomCat();

        await interaction.reply({
            embeds: [{
                description: `Here's a random cat for you! 🐱`,
                image: catImage,
            }], flags: MessageFlags.Ephemeral
        });

    }
}