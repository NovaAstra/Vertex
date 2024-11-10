import type { Gap } from "./internal/_gap"
import type { ImmutableArray } from "./array"
import type { NonNullableFlat } from "./object"

/**
 * Ensures that `A1` fits the type `A2`
 * @category
 * 
 * @template A1
 * @template A2
 * @returns `A1` if it matches `A2`, otherwise `A2`.
 * 
 * @example
 * ```ts
 * import type {Fit} from "@vertex/typify"
 * 
 * type A = Fit<string, string | number>;
 * => type A = string;
 * 
 * type B = Fit<boolean, string>;
 * => type B = string;
 * ```
 */
export type Fit<T1 extends any, T2 extends any> =
    T1 extends T2
    ? T1
    : T2

/**
 * @category
 * 
 * @template T
 * @return
 * A type where each element of `T` is optional and can be `T[K]` or `Gap`.
 * 
 * @example
 * ```ts
 * import type {Gaps} from "@vertex/typify"
 * 
 * type A = Gaps<[string, number?]>;
 * => type A = [string, number?];
 * 
 * type B = Gaps<string[]>;
 * => type B = string[];
 * 
 * type C = Gaps<[string, undefined, number]>;
 * => type C = [string, undefined, number]
 * ```
 */
export type Gaps<T extends ImmutableArray> = Fit<NonNullableFlat<{
    [K in keyof T]?: T[K] | Gap
}>, T>

/**
 * @category
 * 
 * @template T1
 * @template T2
 * @returns
 * 
 * @example
 * ```ts
 * ```
 */
export type Extends<T1 extends any, T2 extends any> =
    [T1] extends [never]
    ? 0
    : T1 extends T2
    ? 1
    : 0

export type Not<T extends boolean> = T extends true
    ? false
    : T extends false
    ? true
    : never;

export type Try<T1 extends any, T2 extends any, Catch = never> =
    T1 extends T2
    ? T1
    : Catch