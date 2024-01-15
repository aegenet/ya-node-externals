// vite.config.js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nodeExternals } from './../build/node-externals';

export async function config(options) {
  const folder = options.folder ? options.folder + '/' : '';

  return defineConfig({
    plugins: [{
      name: 'ya-banner-plugin',
      generateBundle(options, bundles) {
        const banner = "#!/usr/bin/env node";
        const test = /cli\.(js|ts|cjs|mjs|.umd.js)$/;
  
        for (const [fileName, bundle] of Object.entries(bundles)) {
          if (test.test(fileName)) {
            bundle.code = `${banner}\n${bundle.code}`;
          }
        }
      },
    }],
    build: {
      outDir: `./dist/${folder}`,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(options.cwd, `build/${options.entryPoint || 'index.js'}`),
        name: options.libName,
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: options.nodeExternal ? (await nodeExternals(options.cwd)).concat([/^node:/]).concat(options.external || []) : options.external || [],
        output: [
          {
            name: options.libName,
            format: 'cjs',
            entryFileNames: `[name].cjs`,
            globals: options.globals || {},
          },
          {
            name: options.libName,
            format: 'es',
            entryFileNames: `[name].mjs`,
            globals: options.globals || {},
          },
          {
            name: options.libName,
            format: 'umd',
            entryFileNames: `[name].[format].js`,
            globals: options.globals || {},
          },
        ],
      },
    },
  });  
}
