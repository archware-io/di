import { Injector, Resolvable, Inject } from './index';
import { asValue, asImplementation, asClass } from './register';

describe('Injector', () => {
  test('resolve a class', () => {
    // given
    const injector = new Injector();

    @Resolvable()
    class Target {}

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test('register a class', () => {
    // given
    const injector = new Injector();

    @Resolvable()
    class Target {}

    injector.register(asClass(Target));

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test('throw if not decorated', () => {
    // given
    const injector = new Injector();

    class Target {}

    // then
    expect(() => injector.resolve(Target)).toThrowErrorMatchingSnapshot();
  });

  test('resolve a value', () => {
    // given
    const injector = new Injector();

    class Target {}

    // when
    injector.register(asValue(Target, new Target()));

    // then
    expect(injector.resolve(Target)).toBeInstanceOf(Target);
  });

  test('resolve an implementation', () => {
    // given
    const injector = new Injector();

    interface Pet {
      speak(): string;
    }

    abstract class Pet {}

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

  describe('@Inject', () => {
    test('override inferred parameters', () => {
      // given
      const injector = new Injector();

      interface Engine {}

      abstract class Engine {}

      @Resolvable()
      class ElectricEngine implements Engine {}

      @Resolvable()
      class V8Engine implements Engine {}

      @Resolvable()
      class Car {
        constructor(
          // when
          @Inject(V8Engine) public engine: Engine,
        ) {}
      }

      injector.register(asImplementation(Engine, ElectricEngine));

      // then
      expect(injector.resolve(Car).engine).toBeInstanceOf(V8Engine);
    });

    test('couple with asValue() to provide arbitrary type', () => {
      // given
      const injector = new Injector();

      injector.register(asValue('NAME', 'John'));

      @Resolvable()
      class Person {
        constructor(
          // when
          @Inject('NAME') public name: string,
        ) {}
      }

      // then
      expect(injector.resolve(Person).name).toStrictEqual('John');
    });
  });

  describe('singletons', () => {
    test('if not declared singleton, return new instances', () => {
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

    test('if declared singleton, return the same instance', () => {
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

  describe('inheritance', () => {
    test('resolve with inherited dependencies if constructor not overriden', () => {
      // given
      @Resolvable()
      class Dependency {}

      @Resolvable()
      class Parent {
        constructor(public dependency: Dependency) {}
      }

      @Resolvable()
      class Child extends Parent {}

      const injector = new Injector();

      // when
      const child = injector.resolve(Child);

      // then
      expect(child.dependency).toBeInstanceOf(Dependency);
    });

    test('resolve with Child dependencies if constructor overriden', () => {
      // given
      @Resolvable()
      class Dependency {}

      @Resolvable()
      class Parent {}

      @Resolvable()
      class Child extends Parent {
        constructor(public dependency: Dependency) {
          super();
        }
      }

      const injector = new Injector();

      // when
      const child = injector.resolve(Child);

      expect(child.dependency).toBeInstanceOf(Dependency);
    });

    test('throw if parent class not decorated', () => {
      // given
      class Parent {}

      @Resolvable()
      class Child extends Parent {}

      const injector = new Injector();

      // then
      expect(() => injector.resolve(Child)).toThrowErrorMatchingSnapshot();
    });
  });
});
