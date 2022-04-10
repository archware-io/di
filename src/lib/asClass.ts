import { Registrable } from './Registrable';
import { getOptions } from './ResolvableOptions';
import { getClassDependencies } from './getClassDependencies';
import { isResolvable } from './Resolvable';

export const asClass = <T>(Target: any): Registrable<T> => {
  if (!isResolvable(Target)) {
    throw new Error(`
      Passed argument is not a class or is not decorated as @Resolvable()
    `);
  }

  return {
    token: Target,
    descriptor: {
      dependencies: getClassDependencies(Target),
      factory: (...args: any[]) => new Target(...args),
      isSingleton: getOptions(Target)?.singleton ?? false,
    },
  };
};
