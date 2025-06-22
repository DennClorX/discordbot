const { getRandomDogImage } = require('dog-image-api');

module.exports = {
    permission: "",
    data: {
        name: 'dog',
        description: 'Get a random dog image.',
    },

    async run(client, interaction) {
        const dogImage = await getRandomDogImage();

        await interaction.reply({
            embeds: [{
                description: `Here's a random dog for you! 🐶`,
                image: dogImage,
            }], flags: MessageFlags.Ephemeral
        });
    }
}