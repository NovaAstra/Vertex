import type { RequiredObjectKeys } from "./object"

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

/**
 * A utility type to extract the length of an `ImmutableArray`.
 * 
 * @category Array
 * 
 * @template T
 * @returns The length of the array `T`.
 * 
 * @example
 * ```ts
 * import type {ArrayLength} from "@vertex/typify"
 * 
 * type A = ArrayLength<[number,number,number]>; 
 * => type A = 3;
 * 
 * type B = ArrayLength<number[]>; 
 * => type B = number;
 * ```
 */
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
 * A utility type to convert an `ImmutableArray` to an object-like type.
 * It maps the indices of the array to object properties.
 * 
 * If the length of the array is a number, it will create an object where the keys are the indices
 * of the array and the values are the corresponding elements of the array.
 * 
 * @category Array
 * 
 * @template T
 * @returns
 * An object-like type with keys as the indices of the array and values as the corresponding elements of the array.
 * If the array is empty, the resulting type will be `never`.
 * 
 * @example
 * ```ts
 * import type {ObjectOf} from "@vertex/typify"
 * 
 * type A = ObjectOf<[string,number]>;
 * => type A = { 0: string; 1: number; };
 * 
 * type B = ObjectOf<string[]>;
 * => type B = { [x: number]: string; };
 * 
 * type C = ObjectOf<[string,number?]>;
 * => type C = { 0: string; 1?: number | undefined;};
 * ```
 */
export type ObjectOf<T extends ImmutableArray> =
    T extends unknown
    ? number extends ArrayLength<T>
    ? Pick<T, number>
    : Omit<T, keyof any[]>
    : never

/**
 * @category Array
 * 
 * @template T
 * @returns
 * 
 * @example
 * ```ts
 * import type {RequiredArrayKeys} from "@vertex/typify"
 * 
 * type A = RequiredArrayKeys<[string, number, symbol?]>;
 * => type A = "0" | "1";
 * 
 * type B = RequiredArrayKeys<(string | number)[]>;
 * => type B = number;
 * ```
 */
export type RequiredArrayKeys<T extends ImmutableArray> =
    RequiredObjectKeys<ObjectOf<T>>
