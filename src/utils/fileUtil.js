const fs = require("fs/promises");

async function readFile(fileName){
    return JSON.parse(await fs.readFile(fileName, 'utf8'));
}

async function writeFile(fileName, content){
    return fs.writeFile(fileName, JSON.stringify(content));
}


module.exports = {readFile, writeFile}