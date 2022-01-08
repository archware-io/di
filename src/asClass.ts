import { Registrable } from './Registrable';
import { mustGetParamtypes } from './Paramtypes';

export const asClass = <T>(Target: new (...args: any[]) => T): Registrable<T> => {
  return {
    token: Target,
    descriptor: {
      dependencies: mustGetParamtypes(Target),
      factory: (...args: ConstructorParameters<typeof Target>) => new Target(...args),
      isSingleton: false,
    },
  };
};
