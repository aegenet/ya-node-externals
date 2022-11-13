import { argv } from 'node:process';
import * as path from 'node:path';
import { nodeExternals } from './node-externals';

function main() {
  console.time("dependencies");

  return nodeExternals(path.resolve(argv?.length > 2 ? argv[2] : '.'), {
    provider: argv?.length > 3 ? argv[3] : 'dependencies' as any,
    cache: argv?.length > 4 && argv[4] === 'true' ? true : false,
  })
    .then(dependencies => {
      console.timeEnd("dependencies");
      console.log(JSON.stringify(dependencies));
    });
}

main()
.then( () => {
  process.exit(0);
})
.catch( err => {
  console.error(err);
  process.exit(-1);
})