# @aegenet/ya-node-externals

> Yet Another Node Externals
>
> This library is useful to get the list of all dependencies in your ./node_modules folder.

## With Rollup

```js rollup.config.js
const { nodeExternals } = require('@aegenet/ya-node-externals');

module.exports = {
  // [...]

  // make sure to externalize deps that shouldn't be bundled
  // into your library
  external: nodeExternals(process.cwd()),
  
  // [...]
};   
```

## With Vite

```js vite.config.js
import { defineConfig } from 'vite';
import { nodeExternals } from '@aegenet/ya-node-externals';

export default defineConfig({
  // [...]
  build: {
    // [...]
    rollupOptions: {
      // [...]

      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: nodeExternals(process.cwd()),

      // [...]
    }
  }
  // [...]
});
```
