![banner](https://raw.githubusercontent.com/archware-io/di/master/assets/Banner.png "Dependency Injection by Archware")

## About
`@archware/di` is a lightweight inversion of control (IoC) solution for TypeScript projects.
It designed to work seamlessly with object oriented architectures.
It aims to be flexible, but easy to understand.
It can be used in any modern environment, be it browser or Node.

It was created by and is actively used at [archware.io](https://archware.io) software house.

## Motivation
One of the strongest advantages of object oriented programming is interfaces.
They allow defining strong architectural boundaries, which is the cornerstone
of any maintainable piece of software.

Dependency Inversion, Interface Segregation and Open/Closed principle are the SOLID
principles this library aims to encourage.

### What about InversifyJS?
[InversifyJS](https://github.com/inversify/InversifyJS) is a well known IoC solution for TypeScript.
Why create another instead of contributing?

There are a few differences that this project deliberately creates:

#### It puts interfaces first  
The goal is to encourage healthy project architecture and established principles.
It is enabled by putting interfaces at the center.

#### It is designed with simplicity in mind.  
By making less assumptions and deciding where the flexibility
really needs to be, there's less maintenance and almost no learning curve.

#### It has minimal public API  
This guides the user better towards the preferred solution and reduces confusion.
Spend less time browsing the docs and more writing the code.

## Get started
1. Install the package:
```shell
npm install @archware/di --save
```

2. Set `tsconfig.json` flags:
```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

3. Decorate and resolve:
```ts
import { Resolvable, Injector } from '@archware/di';

const injector = new Injector();

// 1. Decorate dependency
@Resolvable()
class Engine { }

// 2. Decorate the resolved class
@Resolvable()
class Car {
  constructor(engine: Engine) { }
}

// 3. Resolve
const car = injector.resolve(Car);
```

## Documentation
The full reference page will soon be shared. It will include
detailed explanations, complex usage guides and library architecture.

For now please refer to common usecase cheatsheets below:
### Resolving a class
```ts
import { Resolvable } from '@archware/di';

// 1. Decorate
@Resolvable()
class Car { }

// 2. Resolve
injector.resolve(Car);
```

### Resolving an interface implementation
```ts
import { Resolvable } from '@archware/di';
import { asImplementation } from '@archware/di/register';

class Car {
  constructor(engine: Engine) { }
}

// 1. Preserve interface as runtime value
// by declaring an abstract class with same name
interface Engine {
  start(): void;
}
abstract class Engine { }

// 2. Decorate the implementation
@Resolvable()
class V8Engine implements Engine {
  start() { }
}

// 3. Register the implementation
injector.register(asImplementation(Engine, V8Engine));

// 4. Get the car with a V8 engine :)
injector.resolve(Car);
```

### Declaring a class is a singleton
```ts
import { Resolvable } from '@archware/di';

@Resolvable({
  singleton: true
})
class Car { }
```

### Resolving a generic value that's not a class
```ts
import { Resolvable } from '@archware/di';
import { asValue } from '@archware/di/register';

// 1. Use asValue to correlate some arbitrary token to a value
injector.register(asValue('PI', Math.PI));

// 2. Resolve using the token
const pi = injector.resolve('PI');
```

## Support
We encourage you to create an issue if you want to:
- raise a bug
- request a feature
- ask for usage advice
- post a general question

We'll try out best to find a viable solution.

## Contributing
Thanks for considering to contribute!
Feel free to drop us a line at `marek@archware.io`

Contributing guide will be prepared soon.

## License
MIT, Copyright (c) 2022 Archware Limited and contributors
