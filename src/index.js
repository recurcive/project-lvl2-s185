
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

const genDiff = (firstText, secondText) => {
  const first = firstText;
  const second = secondText;

  const keys = Array.from(new Set(Object.keys(first).concat(Object.keys(second))));

  return keys.reduce((acc, value) => generateText(acc, value, first, second), '');
};

export default genDiff;

