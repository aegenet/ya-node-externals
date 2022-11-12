import { readFile } from 'node:fs/promises';
import { readdir } from '@aegenet/belt-readdir';

/**
 * Get all dependencies and peerDependencies specified in all package.json found.
 */
export function deepNodeExternals(cwd: string): Promise<string[]> {
  const maps = {};
  const proms: Promise<void>[] = [];

  return readdir(cwd, ({ path }) => {
    if (path.endsWith('package.json')) {
      proms.push(readFile(path, 'utf-8').then(content => {
        let jsonContent = JSON.parse(content);
        Object.assign(maps, jsonContent.dependencies, jsonContent.peerDependencies);
      }));
    }
    return false;
  })
  .then( () => {
    return Promise.all(proms)
    .then(() => {
      return Object.keys(maps);
    });
  });
}
