#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import genDiff from '../index';


const getText = (firstFile, secondFile) => {
  const first = JSON.parse(fs.readFileSync(firstFile));
  const second = JSON.parse(fs.readFileSync(secondFile));

  return genDiff(first, second);
};

program
  .version('0.0.1')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => console.log(getText(firstFile, secondFile)))
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (!program.args.length) program.help();
