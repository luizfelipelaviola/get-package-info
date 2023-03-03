import { setOutput, getInput, setFailed } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  try {
    const pathInput = getInput('path');

    const file = path.resolve(__dirname, pathInput, 'package.json');
    if (!fs.existsSync(file)) throw new Error(`File ${file} does not exist`);

    console.log(`🆗 Reading ${file}`);
    const data = await import(file);

    console.log(`✅ Got app "${data.name}" with version "${data.version}"`);
    setOutput('name', data.name);
    setOutput('version', data.version);
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
    else setFailed('Unknown error');
  }
}

main();
