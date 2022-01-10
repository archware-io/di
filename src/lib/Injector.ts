import type { Registrable } from './Registrable';
import type { Descriptor } from './Descriptor';
import { asClass } from './asClass';

export class Injector {
  constructor(private registry = new Map<any, Descriptor<any>>(), private container = new Map<any, any>()) {}

  public register({ token, descriptor }: Registrable<any>) {
    if (this.registry.has(token)) {
      throw new Error(`
        ${token.prototype?.constructor?.name ?? token} has already been registered.
      `);
    }

    this.registry.set(token, descriptor);
  }

  public resolve<T>(target: abstract new (...args: any[]) => T): T;
  public resolve<T>(target: any): T {
    if (this.container.has(target)) {
      return this.container.get(target);
    }

    const { factory, dependencies, isSingleton } = this.registry.get(target) ?? asClass(target).descriptor;

    const instance = factory(...dependencies.map((dependency) => this.resolve(dependency)));

    if (isSingleton) {
      this.container.set(target, instance);
    }

    return instance;
  }
}
