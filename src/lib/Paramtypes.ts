export const getParamtypes = (target: new (...args: any[]) => any): any[] => {
  return Reflect.getMetadata('design:paramtypes', target) ?? [];
};
