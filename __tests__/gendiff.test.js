import fs from 'fs';
import genDiff from '../src';


const answer = fs.readFileSync('__tests__/__fixtures__/wrigthanswer.txt', 'UTF8');

test('genDiff', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(answer);
});

test('genDiff', () => {
  expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml')).toBe(answer);
});
