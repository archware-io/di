import type { Registrable } from './Registrable';
import { asClass } from './asClass';

export class Injector {
  constructor(private registry = new Map<any, Registrable<any>>(), private container = new Map<any, any>()) {}

  public resolve<T>(target: abstract new (...args: any[]) => T): T;
  public resolve<T>(target: any): T {
    if (this.container.has(target)) {
      return this.container.get(target);
    }

    const {
      descriptor: { factory, dependencies, isSingleton },
    } = this.registry.get(target) ?? asClass(target);

    const instance = factory(...dependencies.map((dependency) => this.resolve(dependency)));

    if (isSingleton) {
      this.container.set(target, instance);
    }

    return instance;
  }
}
