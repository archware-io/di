export const getConstructorName = (Target: any) =>
  Target.prototype?.constructor.name ?? Object.getPrototypeOf(Target).constructor.name;
