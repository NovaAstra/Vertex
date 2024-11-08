export type AnyFunction<T extends ReadonlyArray<unknown> = unknown[], R = unknown> = (...args: T) => R;

