import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { readdir } from '@aegenet/belt-readdir';

/**
 * Get package name from package.json in node_modules/.
 */
export function nodeExternals(cwd: string): Promise<string[]> {
  const set = new Set<string>();
  const proms: Promise<void>[] = [];

  return readdir(path.resolve(cwd, 'node_modules'), ({ path }) => {
    if (path.endsWith('package.json')) {
      proms.push(readFile(path, 'utf-8').then(content => {
        set.add(JSON.parse(content).name);
      }));
    }
    return false;
  })
  .then( () => {
    return Promise.all(proms)
    .then(() => {
      return [...set];
    });
  });
}
