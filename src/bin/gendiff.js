#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';


program
  .version('0.0.1')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => console.log(genDiff(firstFile, secondFile)))
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) program.help();
