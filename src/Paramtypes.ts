import './polyfill';
import { isDecorated } from './Resolvable';

const readParamtypes = (target: any): any[] => {
  return Reflect.getMetadata('design:paramtypes', target) ?? [];
};

export const mustReadParamtypes = (target: any): any[] => {
  if (!isDecorated(target)) {
    throw new Error(`
      Cannot infer constructor parameters for ${target.prototype.constructor.name}.
      It has to be decorated as @Resolvable()
    `);
  }

  return readParamtypes(target);
};
