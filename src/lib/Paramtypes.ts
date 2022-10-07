import { isDecorated } from './Resolvable';
import { getConstructorName } from './getConstructorName';

const getParamtypes = (target: any): any[] => {
  return Reflect.getMetadata('design:paramtypes', target) ?? [];
};

export const mustGetParamtypes = (target: any): any[] => {
  if (!isDecorated(target)) {
    throw new Error(`
      Cannot infer constructor parameters for ${getConstructorName(target)}.
      It has to be decorated with @Resolvable()
    `);
  }

  return getParamtypes(target);
};
