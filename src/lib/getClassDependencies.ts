import { getParamtypes } from './Paramtypes';
import { getInject } from './Inject';

export const getClassDependencies = (Target: any) => {
  const paramtypes = getParamtypes(Target);
  const inject = getInject(Target);

  return paramtypes.map((value, index) => {
    return inject.get(index) ?? value;
  });
};
