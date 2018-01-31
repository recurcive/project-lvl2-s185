import fs from 'fs';
import genDiff from '../src';


const wrightanswer = `
- timeout : 20
+ timeout : 50
- verbose : true
  host : hexlet.io
- proxy : 123.234.53.22`;


test('genDiff', () => {
  const first = JSON.parse(fs.readFileSync('__tests__/__fixtures__/before.json'));
  const second = JSON.parse(fs.readFileSync('__tests__/__fixtures__/after.json'));
  expect(genDiff(first, second)).toBe(wrightanswer);
});
