import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import ini from 'ini';


const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const generateText = (acc, value, beforeObj, afterObj) => {
  const beforeValue = beforeObj[value];
  const afterValue = afterObj[value];

  if (!_.has(beforeObj, value)) {
    return `${acc}\n- ${value} : ${afterValue}`;
  }
  if (!_.has(afterObj, value)) {
    return `${acc}\n- ${value} : ${beforeValue}`;
  }
  if (beforeValue !== afterValue) {
    return `${acc}\n- ${value} : ${beforeValue}\n+ ${value} : ${afterValue}`;
  }
  return `${acc}\n  ${value} : ${beforeValue}`;
};

const getExtensionFile = pathToFile => pathToFile.split('.').pop();


const genDiff = (pathToFile1, pathToFile2) => {
  const first = parsers[getExtensionFile(pathToFile1)](fs.readFileSync(pathToFile1, 'utf-8'));
  const second = parsers[getExtensionFile(pathToFile2)](fs.readFileSync(pathToFile2, 'utf-8'));

  const keys = _.union(_.keys(first), _.keys(second));

  return keys.reduce((acc, value) => generateText(acc, value, first, second), '');
};

export default genDiff;
