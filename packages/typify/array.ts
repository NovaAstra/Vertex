/**
 * An immutable array is an array that cannot be modified after it is created.
 * 
 * @category Array
 * 
 * @template T The type of elements in the array. Defaults to `any`.
 * @returns An array that is read-only and cannot be modified.
 * 
 * @example
 * ```ts
 * import type {ImmutableArray} from "@vertex/typify"
 * 
 * const A: ImmutableArray<number> = [1, 2, 3]; 
 * A[0] = 4; 
 * => Error: Cannot assign to '0' because it is a read-only property.
 * 
 * A.push(4); 
 * => Error: Property 'push' does not exist on type 'readonly number[]'.
 * ```
 */
export type ImmutableArray<T = any> = readonly T[];

export type AnyArray<T = any> = T[] | ImmutableArray<T>

export type Arrayable<T> = T | ImmutableArray<T>;

export type ArrayValues<T extends ImmutableArray> = T[number];

export type ArrayLength<T extends ImmutableArray> =
    T extends { readonly length: infer L }
    ? L
    : never;

/**
 * This type is designed to extract the tail of an array.
 * Given an input array `T`, it returns the subarray that consists of all elements except the first one.
 * If the input array is empty, it returns the empty array itself.
 * 
 * @category Array
 * 
 * @template T The input array from which the tail is to be extracted.
 * @returns The tail of the input array as an `ImmutableArray`.
 * 
 * @example
 * ```ts
 * import type {ArrayTail} from "@vertex/typify"
 * 
 * const A: ArrayTail<[1, "2", 3]> = ["2", 3]
 * const B: ArrayTail<[1, boolean, string]> = [false, "3"]
 * ```
 */
export type ArrayTail<T extends ImmutableArray> =
    T extends readonly []
    ? T
    : T extends readonly [any?, ...infer L]
    ? L
    : T

/**
 * Retrieves the last element of an array.
 * 
 * @category Array
 * 
 * @template T
 * @returns 
 * The last element of the input array. 
 * If the array is empty, the type is inferred as undefined.
 * 
 * @example
 * ```ts
 * import type {ArrayLast} from "@vertex/typify"
 * 
 * const A: ArrayLast<[1, 2, 3]> = 3;
 * const B: ArrayLast<[]> = undefined
 * ```
 */
export type ArrayLast<T extends ImmutableArray> =
    T[ArrayLength<ArrayTail<T>>]


/**
 * @category Array
 * 
 * @template T
 * @returns
 * 
 * @example
 * ```ts
 * import type {ObjectOf} from "@vertex/typify"
 * ```
 */
export type ObjectOf<T extends ImmutableArray> =
    T extends unknown
    ? number extends ArrayLength<T>
    ? Pick<T, number>
    : Omit<T, keyof any[]>
    : never 