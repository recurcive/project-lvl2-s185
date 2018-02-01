import { getMethod } from './generics';
import { contents } from './type';

const getObject = parser => getMethod(parser, 'getObject')(contents(parser));

export default getObject;
