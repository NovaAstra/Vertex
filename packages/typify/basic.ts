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