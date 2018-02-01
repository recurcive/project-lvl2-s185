import { cons, car, cdr } from 'hexlet-pairs'; // eslint-disable-line
import { l, cons as consList } from 'hexlet-pairs-data';
import { attach } from './type'; // eslint-disable-line

let methods = l();

export const getMethod = (obj, methodName) => {
  cdr(methodName);
};

export const definer = type =>
  (methodName, f) => {
    methods = consList(attach(type, cons(methodName, f)), methods);
  };
