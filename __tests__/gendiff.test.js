import genDiff from '../src';


const wrightanswer = `
- timeout : 20
+ timeout : 50
- verbose : true
  host : hexlet.io
- proxy : 123.234.53.22`;


test('genDiff', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(wrightanswer);
});
