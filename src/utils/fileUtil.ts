import { promises as fs } from 'fs';

async function readFile(fileName: string) {
    return JSON.parse(await fs.readFile(fileName, 'utf8'));
}

async function writeFile(fileName: string, content: Object) {
    return fs.writeFile(fileName, JSON.stringify(content));
}

export { readFile, writeFile };
