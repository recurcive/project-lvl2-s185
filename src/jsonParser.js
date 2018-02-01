import fs from 'fs';
import { definer } from './generics';
import { attach } from './type';


const TYPE = 'Json';

const defmethod = definer(TYPE);

const make = radius => attach(TYPE, radius);
export default make;

// export const getObject = pathToFile => JSON.parse(fs.readFileSync(pathToFile));
defmethod('getObject', pathToFile => JSON.parse(fs.readFileSync(pathToFile)));
