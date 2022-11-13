import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { readdir } from '@aegenet/belt-readdir';

/**
 * Get package names from all package.json in node_modules/.
 *
 * @remarks Some packages contain a fake package.json for "test" (nice...).
 */
export function dumbProvider(cwd: string): Promise<string[]> {
  const set = new Set<string>();
  const proms: Promise<void>[] = [];

  return readdir(path.resolve(cwd, 'node_modules'), ({ path }) => {
    if (path.endsWith('package.json')) {
      proms.push(readFile(path, 'utf-8').then(content => {
        try {
          // Some packages contain a fake package.json for "test" (nice...).
          const jsonContent = JSON.parse(content);
          if (jsonContent?.name) {
            set.add(jsonContent.name);
          }
        } catch {
          console.log(path, content);
        }
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
