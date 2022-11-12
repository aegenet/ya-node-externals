import { argv } from 'node:process';
import * as path from 'node:path';
import { nodeExternals } from './node-externals';

function main() {
  console.time("dependencies");

  return nodeExternals(path.resolve(argv[2]?.length ? argv[2] : '.'))
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