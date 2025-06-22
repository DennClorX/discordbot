const { Events, ActivityType } = require('discord.js');
const colorfuller = require('colorfuller')
const { stringToAscii, fonts } = require('asciifyer');

module.exports = {
	event: Events.ClientReady,
	once: true,
	async execute(client) {
        console.log(client.user.username + " is now online!")
		client.user.setPresence({
			activities: [{ name: `${client.guilds.cache.size} Servers`, type: ActivityType.Watching }],
			status: 'online',
		});
        console.clear()
		console.log(colorfuller.txt(await stringToAscii(`aizyl`, fonts.DeltaCorpsPriest), "blue")+ ` is now online!`)


	},
};
