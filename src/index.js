import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
// import getObject from './parser';


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

const getObject = (pathToFile) => {
  const fileType = getExtensionFile(pathToFile);
  switch (_.lowerCase(fileType)) {
    case 'json':
      return JSON.parse(fs.readFileSync(pathToFile));
    case 'yaml':
      return yaml.safeLoad(fs.readFileSync(pathToFile));
    default:
      return '';
  }
};

const genDiff = (pathToFile1, pathToFile2) => {
  const first = getObject(pathToFile1);
  const second = getObject(pathToFile2);

  const keys = _.union(_.keys(first), _.keys(second));

  return keys.reduce((acc, value) => generateText(acc, value, first, second), '');
};

export default genDiff;
