const getFiles = require('../utils/getFiles');
const path = require('node:path');

module.exports = (client) => {
    const folders = getFiles(path.join(__dirname, '../events'));
    folders.forEach((folder) => {
        const files = getFiles(folder);
        for (const file of files) {
            const event = require(file);
            if (event.once) {
                client.once(event.event, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.event, (...args) => event.execute(client, ...args));
            }
        }
    })
}