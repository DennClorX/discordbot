const getFiles = require('../utils/getFiles');
const path = require('node:path');

module.exports = (commands) => {
        const folders = getFiles(path.join(__dirname, '../commands'));
        for (const folder of folders) {
            const files = getFiles(folder);
            for (const file of files) {
                const command = require(file);
                commands.push(command.data);
            }
        }
}