const fs = require('node:fs');
const path = require('node:path');

module.exports = (dir) => {
    let fileNames = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        fileNames.push(filePath);
    }
    return fileNames;
}
