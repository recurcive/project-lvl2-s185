import fs from 'fs';
import genDiff from '../src';


test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightSimpleAnswer.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightSimpleAnswer.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.yaml', '__tests__/__fixtures__/after.yaml')).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightSimpleAnswerINI.txt', 'UTF8');
  expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini')).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightRecursiveAnswer.txt', 'UTF8');
  expect(genDiff(
    '__tests__/__fixtures__/beforeRecursive.json',
    '__tests__/__fixtures__/afterRecursive.json',
  )).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightRecursiveAnswer.txt', 'UTF8');
  expect(genDiff(
    '__tests__/__fixtures__/beforeRecursive.yaml',
    '__tests__/__fixtures__/afterRecursive.yaml',
  )).toBe(answer);
});

test('genDiff', () => {
  const answer = fs.readFileSync('__tests__/__fixtures__/wrightRecursiveAnswer.txt', 'UTF8');
  expect(genDiff(
    '__tests__/__fixtures__/beforeRecursive.ini',
    '__tests__/__fixtures__/afterRecursive.ini',
  )).toBe(answer);
});
