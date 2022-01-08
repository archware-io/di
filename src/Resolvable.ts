export const Resolvable = (): ClassDecorator => (target: any) => {
  setDecorated(target);
};

const IS_DECORATED = Symbol('IS_DECORATED');

const setDecorated = (target: any) => {
  Object.defineProperty(target, IS_DECORATED, {
    value: true,
    configurable: false,
    writable: false,
    enumerable: false,
  });
};

export const isDecorated = (target: any): boolean => {
  return target[IS_DECORATED] === true;
};
