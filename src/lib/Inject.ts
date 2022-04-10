const INJECT = Symbol('INJECT');

export const setInject = (target: any, index: number, token: any) => {
  const inject = getInject(target);

  inject.set(index, token);

  target[INJECT] = inject;
};

export const getInject = (target: any): Map<number, any> => {
  return target[INJECT] ?? new Map();
};

export const Inject =
  (token: any): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    setInject(target, parameterIndex, token);
  };
