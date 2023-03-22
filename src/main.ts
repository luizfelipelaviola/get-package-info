import { setOutput, getInput, setFailed } from '@actions/core';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  try {
    const pathInput = getInput('path', { required: false }) || '.';

    const file = path.join(pathInput, 'package.json');
    if (!fs.existsSync(pathInput)) throw new Error(`File ${file} does not exist`);

    console.log(`🆗 Reading ${file}`);
    const data = JSON.parse(fs.readFileSync(file).toString());

    console.log(`✅ Got app "${data.name}" with version "${data.version}"`);
    setOutput('name', data.name);
    setOutput('version', data.version);
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
    else setFailed('Unknown error');
  }
}

main();
