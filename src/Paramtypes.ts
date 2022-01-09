import { isDecorated } from './Resolvable';

const getParamtypes = (target: any): any[] => {
  return Reflect.getMetadata('design:paramtypes', target) ?? [];
};

export const mustGetParamtypes = (target: any): any[] => {
  if (!isDecorated(target)) {
    throw new Error(`
      Cannot infer constructor parameters for ${target.prototype.constructor.name}.
      It has to be decorated as @Resolvable()
    `);
  }

  return getParamtypes(target);
};
