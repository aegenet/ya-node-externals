import { DependenciesProvider } from './providers/dependencies-provider';
import { dumbProvider } from './providers/dumb-provider';

/**
 * Get package name from package.json in node_modules/.
 */
export async function nodeExternals(cwd: string, options: {
  provider?: 'dumb' | 'dependencies' | 'allDependencies',
  cache?: boolean,
} = {}): Promise<string[]> {

  options.cache ||= false;
  options.provider ||= 'dependencies';

  switch (options.provider) {
    case 'dependencies':
      return await new DependenciesProvider({
        dependencies: true,
        peerDependencies: true,
        devDependencies: false,
      }).getAll(cwd);
    case 'allDependencies':
      return await new DependenciesProvider({
        dependencies: true,
        peerDependencies: true,
        devDependencies: true,
      }).getAll(cwd);
    case 'dumb':
      return await dumbProvider(cwd);
    default:
      throw new Error(`Invalid supplier: '${options.provider}' ('dependencies', 'allDependencies' or 'dumb' are valid).`)
  }
}
