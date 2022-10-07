import { Registrable } from './Registrable';
import { getOptions } from './ResolvableOptions';
import { getClassDependencies } from './getClassDependencies';
import { isDecorated } from './Resolvable';
import { getConstructorName } from './getConstructorName';

const getParent = (Target: new (...args: any[]) => any) => {
  return Object.getPrototypeOf(Target);
};

const hasParent = (Target: new (...args: any[]) => any) => {
  return Object.getPrototypeOf(Target).name !== '';
};

export const asClass = <T>(Target: new (...args: any[]) => T): Registrable<T> => {
  if (hasParent(Target)) {
    const parent = getParent(Target);

    if (!isDecorated(parent)) {
      throw new Error(
        `Parent class ${getConstructorName(parent)} of ${getConstructorName(
          Target,
        )} has to be decorated with @Resolvable()`,
      );
    }
  }

  return {
    token: Target,
    descriptor: {
      dependencies: getClassDependencies(Target),
      factory: (...args: ConstructorParameters<typeof Target>) => new Target(...args),
      isSingleton: getOptions(Target)?.singleton ?? false,
    },
  };
};
