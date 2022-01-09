import { Registrable } from './Registrable';

export const asValue = <T>(token: any, value: T): Registrable<T> => {
  return {
    token,
    descriptor: {
      isSingleton: false,
      dependencies: [],
      factory: () => value,
    },
  };
};
