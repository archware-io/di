import type { Descriptor } from './Descriptor';

export interface Registrable<T> {
  token: any;
  descriptor: Descriptor<T>;
}
