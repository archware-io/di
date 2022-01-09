import { Injector, Resolvable } from './index';
import { asValue, asImplementation, asClass } from './register';

describe("Injector", () => {
  test("resolve a class", () => {
    // given
    const injector = new Injector();

    @Resolvable()
    class Target { }

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test("register a class", () => {
    // given
    const injector = new Injector();

    @Resolvable()
    class Target { }

    injector.register(asClass(Target));

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test("fail resolving class when not decorated", () => {
    // given
    const injector = new Injector();

    class Target { }

    // then
    expect(() => injector.resolve(Target)).toThrow();
  });

  test("resolve a value", () => {
    // given
    const injector = new Injector();

    class Target { }

    // when
    injector.register(asValue(Target, new Target()));

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test("resolve an implementation", () => {
    // given
    const injector = new Injector();

    interface Pet {
      speak(): string;
    }

    abstract class Pet { }

    @Resolvable()
    class Dog implements Pet {
      speak(): string {
        return 'woof';
      }
    }

    // when
    injector.register(asImplementation(Pet, Dog));

    // then
    expect(injector.resolve(Pet)).toBeInstanceOf(Dog);
  });

  describe("singletons", () => {
    test("if not declared singleton, return new instances", () => {
      // given
      const injector = new Injector();
      const instanceCreated = jest.fn();

      @Resolvable()
      class NotSingleton {
        constructor() {
          instanceCreated();
        }
      }

      // when
      injector.resolve(NotSingleton);
      injector.resolve(NotSingleton);

      // then
      expect(instanceCreated).toHaveBeenCalledTimes(2);
    });

    test("if declared singleton, return the same instance", () => {
      // given
      const injector = new Injector();
      const instanceCreated = jest.fn();

      @Resolvable({
        singleton: true,
      })
      class Singleton {
        constructor() {
          instanceCreated();
        }
      }

      // when
      injector.resolve(Singleton);
      injector.resolve(Singleton);

      // then
      expect(instanceCreated).toHaveBeenCalledTimes(1);
    });
  });
});
