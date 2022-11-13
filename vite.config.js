// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('./.build/vite.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/ya-node-externals',
  entryPoint: 'index',
  nodeExternal: true,
});
