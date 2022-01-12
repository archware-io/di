import { Registrable } from './Registrable';
import { getOptions } from './ResolvableOptions';
import { getClassDependencies } from './getClassDependencies';

export const asClass = <T>(Target: new (...args: any[]) => T): Registrable<T> => {
  return {
    token: Target,
    descriptor: {
      dependencies: getClassDependencies(Target),
      factory: (...args: ConstructorParameters<typeof Target>) => new Target(...args),
      isSingleton: getOptions(Target)?.singleton ?? false,
    },
  };
};
