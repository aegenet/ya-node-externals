// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./.build/rollup.dts.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/ya-node-externals',
  entryPoint: 'index.ts',
  nodeExternal: true,
});
