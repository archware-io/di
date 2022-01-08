import { Injector } from './Injector';

describe("Injector", () => {
  const injector = new Injector();

  test("resolve a class", () => {
    class Target { }

    expect(() => injector.resolve(Target)).toThrowError();
  });
});
