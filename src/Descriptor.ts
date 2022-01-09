export interface Descriptor<T> {
  dependencies: any[];
  factory: (...args: any[]) => T;
  isSingleton: boolean;
}
