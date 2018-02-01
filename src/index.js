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

const getExtensionFile = pathToFile => pathToFile.substr((pathToFile.lastIndexOf('.') + 1));

const getData = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const genDiff = (pathToFile1, pathToFile2) => {
  const first = parsers[getExtensionFile(pathToFile1)](getData(pathToFile1));
  const second = parsers[getExtensionFile(pathToFile2)](getData(pathToFile2));

  const keys = _.union(_.keys(first), _.keys(second));

  return keys.reduce((acc, value) => generateText(acc, value, first, second), '');
};

export default genDiff;
