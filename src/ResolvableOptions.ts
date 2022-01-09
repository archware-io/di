const OPTIONS = Symbol('RESOLVABLE_OPTIONS');

export type ResolvableOptions = {
  singleton: boolean;
};

export const setOptions = (target: any, options: ResolvableOptions) => {
  Object.defineProperty(target, OPTIONS, {
    value: options,
    configurable: false,
    writable: false,
    enumerable: false,
  });
};

export const getOptions = (target: any): ResolvableOptions | undefined => target[OPTIONS];
