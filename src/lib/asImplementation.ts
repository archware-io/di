import { Registrable } from './Registrable';
import { mustGetParamtypes } from './Paramtypes';
import { getOptions } from './ResolvableOptions';

export const asImplementation = <T>(
  InterfaceClass: abstract new (...args: any[]) => T,
  ImplementationClass: new (...args: any[]) => T,
): Registrable<T> => {
  return {
    token: InterfaceClass,
    descriptor: {
      factory: (...args: ConstructorParameters<typeof ImplementationClass>) => new ImplementationClass(...args),
      dependencies: mustGetParamtypes(ImplementationClass),
      isSingleton: getOptions(ImplementationClass)?.singleton ?? false,
    },
  };
};
