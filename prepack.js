import child_process from 'child_process';
import { promisify } from util;

const execFile = promisify(child_process.execFile);

const exec = async (cmd, ...args) => {
    console.log(`> ${cmd.join(" ")}`);
    return await execFile(cmd, ...args);
}   

const main = async () => {
    await exec("npx", "embedme", "README.md");
    await exec("npx", "tsc");
}