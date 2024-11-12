import type { Cast } from "./_cast"
import type { ImmutableArray } from "../array"
import type { NonNullableFlat } from "../object"

/** 
 * A unique symbol used as a type-level placeholder or "gap" 
 * to indicate missing or unfilled positions within a type.
 * 
 * @internal
 */
const GapSymbol = Symbol('gap');

/**
 * `Gap` represents a type-level placeholder for unfilled or missing positions.
 * 
 * @internal
 */
export type Gap = typeof GapSymbol & {};

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
export type Gaps<T extends ImmutableArray> = Cast<NonNullableFlat<{
    [K in keyof T]?: T[K] | Gap
}>, ImmutableArray>
