import type { Registrable } from './Registrable';

export class Injector {
  constructor(private registry = new Map<any, Registrable<any>>()) {}

  public resolve<T>(target: abstract new (...args: any[]) => T): T;
  public resolve<T>(target: any): T {
    const registrable = this.registry.get(target) ?? asClass();

    if (registrable === undefined) {
    }
  }
}
