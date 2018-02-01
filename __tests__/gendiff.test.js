import fs from 'fs';
import genDiff from '../src';


test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrigthanswer.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrigthanswer.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml')).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrigthanswer.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini')).toBe(answer);
});
