import '@abraham/reflection';
import { ResolvableOptions, setOptions } from './ResolvableOptions';

export const Resolvable = (options?: ResolvableOptions) => (target: new (...args: any[]) => any) => {
  if (options !== undefined) {
    setOptions(target, options);
  }

  setResolvable(target);
};

const IS_RESOLVABLE = Symbol('IS_RESOLVABLE');

const setResolvable = (target: new (...args: any[]) => any) => {
  Object.defineProperty(target, IS_RESOLVABLE, {
    value: true,
    configurable: false,
    writable: false,
    enumerable: false,
  });
};

export const isResolvable = (target: any): target is new (...args: any[]) => any => {
  return target[IS_RESOLVABLE] === true;
};
