type AbstractClassToken<T> = abstract new (...args: any[]) => T;
type ConcreteClassToken<T> = new (...args: any[]) => T;

export type ClassToken<T> = AbstractClassToken<T> | ConcreteClassToken<T>;
