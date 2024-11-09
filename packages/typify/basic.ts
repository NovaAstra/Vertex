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
 * 
 * @example
 * ```ts
 * import type {Gaps} from "@vertex/typify"
 * ```
 */
export type Gaps<T extends ImmutableArray> = Fit<NonNullableFlat<{
    [K in keyof T]?: T[K] | Gap
}>, T>