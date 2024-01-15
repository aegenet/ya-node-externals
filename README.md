[![npm version](https://img.shields.io/npm/v/@aegenet/ya-node-externals.svg)](https://www.npmjs.com/package/@aegenet/ya-node-externals)
[![Build Status](https://github.com/aegenet/ya-node-externals/actions/workflows/ci.yml/badge.svg)](https://github.com/aegenet/ya-node-externals/actions)
[![codecov](https://codecov.io/gh/aegenet/ya-node-externals/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/aegenet/ya-node-externals)
<br />

# @aegenet/ya-node-externals

> Yet Another Node Externals
>
> This library is useful to get the complete list of your dependencies.

## 💾 Installation

```shell
yarn add @aegenet/ya-node-externals@^1 -D
# or
npm i @aegenet/ya-node-externals@^1 --save-dev
```

## 📝 Usage

### With Rollup

```js rollup.config.js
const { nodeExternals } = require('@aegenet/ya-node-externals');

export default async () => ({
  // [...]

  // make sure to externalize deps that shouldn't be bundled
  // into your library
  external: await nodeExternals(process.cwd()),
  // or for node package
  external: (await nodeExternals(process.cwd())).concat([/^node:/]),

  // [...]
});   
```

### With Vite

```js vite.config.js
import { defineConfig } from 'vite';
import { nodeExternals } from '@aegenet/ya-node-externals';

export default async defineConfig({
  // [...]
  build: {
    // [...]
    rollupOptions: {
      // [...]

      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: await nodeExternals(process.cwd()),
      // or for node package
      external: (await nodeExternals(process.cwd())).concat([/^node:/]),

      // [...]
    }
  }
  // [...]
});
```

# License

[The MIT License](LICENSE) - Copyright © 2024 [Alexandre Genet](https://github.com/aegenet).
