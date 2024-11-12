
/**
 * Ensures that `A1` fits the type `A2`
 * @category
 * 
 * @template T1
 * @template T2
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
export type Cast<T1, T2> =
    T1 extends unknown
    ? T2 extends unknown
    ? T1 extends T2
    ? T1
    : T2
    : never
    : never;