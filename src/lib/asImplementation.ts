import { Registrable } from './Registrable';
import { getOptions } from './ResolvableOptions';
import { getClassDependencies } from './getClassDependencies';
import { isResolvable } from './Resolvable';

export const asImplementation = <T>(
  InterfaceClass: abstract new (...args: any[]) => T,
  ImplementationClass: new (...args: any[]) => T,
): Registrable<T> => {
  if (!isResolvable(ImplementationClass)) {
    throw new Error(`
      Implementation class has to be decorated as @Resolvable()
    `);
  }

  return {
    token: InterfaceClass,
    descriptor: {
      factory: (...args: ConstructorParameters<typeof ImplementationClass>) => new ImplementationClass(...args),
      dependencies: getClassDependencies(ImplementationClass),
      isSingleton: getOptions(ImplementationClass)?.singleton ?? false,
    },
  };
};
