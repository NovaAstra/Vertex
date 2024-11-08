import { type ReadonlyArray } from "./array"

export type AnyFunction<T extends ReadonlyArray = unknown[], R = unknown> = (...args: T) => R;
