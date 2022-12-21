const fs = require('fs/promises');

const path = './src/talker.json';

const readFile = async () => {
    try {
        const file = await fs.readFile(path, 'utf-8');
        const fileParse = await JSON.parse(file);
        return fileParse;
    } catch (error) {
        return [];
    }
};

const writeFile = async (param) => {
    try {
        const fileWrite = JSON.stringify(param);
        fs.writeFile(path, fileWrite);
    } catch (error) {
        console.log('error');
    }
};

//
module.exports = { readFile, writeFile };
