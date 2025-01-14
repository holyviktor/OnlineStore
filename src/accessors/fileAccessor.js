const fs = require("fs/promises");

async function readFile(fileName){
    return await fs.readFile(fileName,  'utf8');
}

async function writeFile(fileName, content){
    await fs.writeFile(fileName, content);
}


module.exports = {readFile, writeFile}