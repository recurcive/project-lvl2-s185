import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import ini from 'ini';


const SPACE_COUNT = 2;

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getSign = {
  removed: '-',
  added: '+',
  unchanged: ' ',
  node: '',
};

const getExtensionFile = pathToFile => pathToFile.substr((pathToFile.lastIndexOf('.') + 1));

const getData = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const generateAst = (keys, first, second, space) => keys.reduce((acc, key, index) => {
  if (_.isObject(first[key]) && _.isObject(second[key])) {
    return [...acc, {
      key,
      value: generateAst(
        _.union(_.keys(first[key]), _.keys(second[key])),
        first[key],
        second[key],
        index + SPACE_COUNT,
      ),
      type: 'node',
      space: index,
    }];
  }
  if (!_.has(first, key)) {
    return [...acc, {
      key, value: second[key], type: 'added', space,
    }];
  }
  if (!_.has(second, key)) {
    return [...acc, {
      key, value: first[key], type: 'removed', space,
    }];
  }
  if (first[key] !== second[key]) {
    return [...acc,
      {
        key, value: first[key], type: 'removed', space,
      },
      {
        key, value: second[key], type: 'added', space,
      }];
  }
  return [...acc, {
    key, value: first[key], type: 'unchanged', space,
  }];
}, []);

const renderString = (acc, node) => {
  if (node instanceof Array) {
    node.reduce(renderString, []);
  }
  if (node.type === 'node') {
    return `${acc}\n ${' '.repeat(node.space)} ${getSign[node.type]} ${node.key} : {${node.value.reduce(renderString, [])}\n${' '.repeat(node.space + SPACE_COUNT)}}`;
  }
  return `${acc}\n ${' '.repeat(node.space)} ${getSign[node.type]} ${node.key} : ${(node.value instanceof Object) ? JSON.stringify(node.value) : node.value}`;
};

const generateText = data => data.reduce((acc, node) => renderString(acc, node), '');

const genDiff = (pathToFile1, pathToFile2) => {
  const first = parsers[getExtensionFile(pathToFile1)](getData(pathToFile1));
  const second = parsers[getExtensionFile(pathToFile2)](getData(pathToFile2));

  const keys = _.union(_.keys(first), _.keys(second));

  const astTree = generateAst(keys, first, second);

  return generateText(astTree);
};

export default genDiff;
