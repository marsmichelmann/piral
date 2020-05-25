import { resolve } from 'path';
import { log } from '../log';
import { runShell } from '../scripts';
import { MemoryStream } from '../MemoryStream';

function runNpmProcess(args: Array<string>, target: string, output?: NodeJS.WritableStream) {
  log('generalDebug_0003', 'Starting the NPM process ...');
  const cwd = resolve(process.cwd(), target);
  return runShell('npm', args, cwd, output);
}

export async function installDependencies(target = '.', ...flags: Array<string>) {
  const ms = new MemoryStream();
  await runNpmProcess(['install', ...flags], target, ms);
  log('generalDebug_0003', `NPM install dependencies result: ${ms.value}`);
  return ms.value;
}

export async function installPackage(packageRef: string, target = '.', ...flags: Array<string>) {
  const ms = new MemoryStream();
  await runNpmProcess(['install', packageRef, ...flags], target, ms);
  log('generalDebug_0003', `NPM install package result: ${ms.value}`);
  return ms.value;
}

export async function createPackage(target = '.', ...flags: Array<string>) {
  const ms = new MemoryStream();
  await runNpmProcess(['pack', ...flags], target, ms);
  log('generalDebug_0003', `NPM pack result: ${ms.value}`);
  return ms.value;
}

export async function findSpecificVersion(packageName: string, version: string) {
  const ms = new MemoryStream();
  await runNpmProcess(['show', packageName, 'version', `--tag ${version}`], '.', ms);
  log('generalDebug_0003', `NPM show result: ${ms.value}`);
  return ms.value;
}
