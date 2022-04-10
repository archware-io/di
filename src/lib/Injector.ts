import type { Registrable } from './Registrable';
import type { Descriptor } from './Descriptor';
import { ClassToken } from './ClassToken';
import { asClass } from './asClass';

export class Injector {
  constructor(private registry = new Map<any, Descriptor<any>>(), private container = new Map<any, any>()) {}

  public register({ token, descriptor }: Registrable<any>) {
    this.registry.set(token, descriptor);
  }

  public resolve<TResolved, TToken = unknown>(token: TToken): TToken extends ClassToken<infer T> ? T : TResolved {
    if (this.container.has(token)) {
      return this.container.get(token);
    }

    const { factory, dependencies, isSingleton } = this.registry.get(token) ?? asClass(token).descriptor;

    const instance = factory(...dependencies.map((dependency) => this.resolve(dependency)));

    if (isSingleton) {
      this.container.set(token, instance);
    }

    return instance;
  }
}
