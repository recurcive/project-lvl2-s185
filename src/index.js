import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import ini from 'ini';


const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getSign = {
  removed: '-',
  added: '+',
  unchanged: ' ',
  node: ' ',
};

const getExtensionFile = pathToFile => pathToFile.substr((pathToFile.lastIndexOf('.') + 1));

const getData = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

const generateAst = (before, after) => {
  const iter = (first, second) => {
    const keys = _.union(_.keys(first), _.keys(second));

    return keys.reduce((acc, key) => {
      if (_.isObject(first[key]) && _.isObject(second[key])) {
        return [...acc, {
          key,
          body: iter(first[key], second[key]),
          type: 'node',
        }];
      }
      if (!_.has(first, key)) {
        return [...acc, {
          key, value: second[key], type: 'added',
        }];
      }
      if (!_.has(second, key)) {
        return [...acc, {
          key, value: first[key], type: 'removed',
        }];
      }
      if (first[key] !== second[key]) {
        return [...acc,
          {
            key, value: first[key], type: 'removed',
          },
          {
            key, value: second[key], type: 'added',
          }];
      }
      return [...acc, {
        key, value: first[key], type: 'unchanged',
      }];
    }, {});
  };

  return { type: 'node', body: iter(before, after) };
};

const renderString = (acc, currentDepth, node) => {
  if (node.type === 'node') {
    return `${acc}\n${' '.repeat(currentDepth * 2)}${getSign[node.type]} ${node.key} : {${node.body.reduce((ac, elem) => renderString(ac, currentDepth + 1, elem), [])}\n  ${' '.repeat(currentDepth * 2)}}`;
  }
  return `${acc}\n${' '.repeat(currentDepth)} ${getSign[node.type]} ${node.key} : ${JSON.stringify(node.value)}`;
};

const generateText = (data, depth = 0) => data.body.reduce((acc, node) => renderString(acc, depth, node), '');

const genDiff = (pathToFile1, pathToFile2) => {
  const first = parsers[getExtensionFile(pathToFile1)](getData(pathToFile1));
  const second = parsers[getExtensionFile(pathToFile2)](getData(pathToFile2));

  const astTree = generateAst(first, second);

  return generateText(astTree);
};

export default genDiff;
