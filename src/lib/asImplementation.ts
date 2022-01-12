import { Registrable } from './Registrable';
import { getOptions } from './ResolvableOptions';
import { getClassDependencies } from './getClassDependencies';

export const asImplementation = <T>(
  InterfaceClass: abstract new (...args: any[]) => T,
  ImplementationClass: new (...args: any[]) => T,
): Registrable<T> => {
  return {
    token: InterfaceClass,
    descriptor: {
      factory: (...args: ConstructorParameters<typeof ImplementationClass>) => new ImplementationClass(...args),
      dependencies: getClassDependencies(ImplementationClass),
      isSingleton: getOptions(ImplementationClass)?.singleton ?? false,
    },
  };
};
