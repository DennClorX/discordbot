const getFiles = require('../utils/getFiles');
const path = require('node:path');

module.exports = (client) => {
    const folders = getFiles(path.join(__dirname, '../commands'));
    folders.forEach((folder) => {
        const files = getFiles(folder);
        for (const file of files) {
            const command = require(file);
            client.commands.set(command.data.name, command);
        }
    })
}