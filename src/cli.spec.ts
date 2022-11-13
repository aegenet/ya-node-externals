import { Worker } from 'worker_threads';
import * as path from 'path';
import * as assert from 'assert';

describe('node-externals', () => {
  describe('dumb', () => {
    it('Ok with path', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./', 'dumb'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, 0);
    });
  
    it('Ko', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./____/_________________', 'dumb'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, -1);
    });
  });

  describe('dependencies', () => {
    it('Ok with path', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, 0);
    });
  
    it('Ok without args', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'));
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, 0);
    });
  
    it('Ko', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./____/_________________'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, -1);
    });
  });

  describe('all dependencies', () => {
    it('Ok with path', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./', 'allDependencies'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, 0);
    });

    it('Ko', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./____/_________________', 'allDependencies'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, -1);
    });
  });

  describe('Invalid provider', () => {
    it('KO', async () => {
      const code = await new Promise<number>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['./', 'dontexist'],
        });
        worker.on('exit', code => {
          resolve(code);
        });
      });
      assert.strictEqual(code, -1);
    });
  });
});
