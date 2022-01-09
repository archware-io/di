import { mustGetParamtypes } from './Paramtypes';
import { mustGetInject } from './Inject';

export const getClassDependencies = (Target: any) => {
  const paramtypes = mustGetParamtypes(Target);
  const inject = mustGetInject(Target);

  return paramtypes.map(((value, index) => {
    return inject.get(index) ?? value;
  }));
}
