import fs from 'fs';

const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const generateText = (acc, value, beforeObj, afterObj) => {
  const beforeValue = beforeObj[value];
  const afterValue = afterObj[value];

  if (!has(beforeObj, value)) {
    return `${acc}\n- ${value} : ${afterValue}`;
  }
  if (!has(afterObj, value)) {
    return `${acc}\n- ${value} : ${beforeValue}`;
  }
  if (beforeValue !== afterValue) {
    return `${acc}\n- ${value} : ${beforeValue}\n+ ${value} : ${afterValue}`;
  }
  return `${acc}\n  ${value} : ${beforeValue}`;
};

// export default function (pathToFile1, pathToFile2) {
const genDiff = (pathToFile1, pathToFile2) => {
  console.log('hegfuergy');
  const first = JSON.parse(fs.readFileSync(pathToFile1));
  const second = JSON.parse(fs.readFileSync(pathToFile2));

  const keys = Object.keys({ ...first, ...second });

  return keys.reduce((acc, value) => generateText(acc, value, first, second), '');
};

export default genDiff;
