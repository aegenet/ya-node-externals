import { access, readFile, stat } from 'node:fs/promises';
import * as path from 'node:path';

export class DependenciesProvider {
  private _set?: Set<string>;
  private _missCache?: Set<string>;

  constructor(private readonly _options: {
    dependencies: boolean,
    devDependencies: boolean,
    peerDependencies: boolean,
  } = {
    dependencies: true,
    peerDependencies: true,
    devDependencies: false
  }) {
    //
  }

  /**
   * Get the package names from `dependencies` and `peerDependencies` recursively.
   */
  public async getAll(cwd: string): Promise<string[]> {
    this._set = new Set();
    this._missCache = new Set();

    await this._fillDependenciesSet(cwd, 'package.json');
    const results = [...this._set];
    this._set = undefined;
    this._missCache = undefined;
    return results;
  }
  
  /**
   * Fill the Set with dependencies
   */
  private async _fillDependenciesSet(cwd: string, packagePath: string, depth: number = 0): Promise<void> {
    const pckPath = path.resolve(cwd, packagePath);

    if (!this._missCache!.has(packagePath) && (await access(pckPath).then(() => true).catch(() => false))) {
      const mainPkg = JSON.parse(await readFile(pckPath, 'utf-8'));
  
      const dependencies = [];
      if (this._options.dependencies && mainPkg.dependencies) {
        dependencies.push(...Object.keys(mainPkg.dependencies));
      }
      if (this._options.peerDependencies && mainPkg.peerDependencies) {
        dependencies.push(...Object.keys(mainPkg.peerDependencies));
      }
      if (depth === 0 && this._options.devDependencies && mainPkg.devDependencies) {
        // devDependencies are searched only in the main package.json
        dependencies.push(...Object.keys(mainPkg.devDependencies));
      }
    
      let dep: string;
      for (let i = 0; i < dependencies.length; i++) {
        dep = dependencies[i];
    
        if (!this._set!.has(dep)) {
          // prevent loop, immediat add in set the current dep
          this._set!.add(dep);
          await this._fillDependenciesSet(cwd, path.join('node_modules', dep, 'package.json'), depth + 1);
        }
      }
    } else {
      this._missCache!.add(packagePath);
      if (depth === 0) {
        throw new Error(`Invalid main package.json path: ${packagePath}`);
      }
    }
  }
}
