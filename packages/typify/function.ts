import type { ImmutableArray } from "./array"

export type AnyFunction<T extends ImmutableArray = any[], R = any> = (...args: T) => R;

