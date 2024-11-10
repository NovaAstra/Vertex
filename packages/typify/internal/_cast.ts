
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
 * import type {Cast} from "@vertex/typify"
 * 
 * type A = Cast<string, string | number>;
 * => type A = string;
 * 
 * type B = Cast<boolean, string>;
 * => type B = string;
 * ```
 */
export type Cast<T, U> =
    T extends unknown
    ? U extends unknown
    ? T extends U
    ? T
    : U
    : never
    : never;