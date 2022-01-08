export class Injector {
  public resolve<T>(target: abstract new (...args: any[]) => T): T;
  public resolve<T>(target: any): T {
    throw new Error('Not implemented');
  }
}
