import { type ReadonlyArray } from "./array"

export type AnyFunction<T extends ReadonlyArray = unknown[], R = unknown> = (...args: T) => R;

export type Promisable<T> = T | PromiseLike<T>;
