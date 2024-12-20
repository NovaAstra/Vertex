import type { Intrinsic } from "./internal/_intrinsic"
import type { Key } from "./internal/_key"

/**
 * Creates a new type by making all properties of the input type non-nullable 
 * and then flattening them.
 * 
 * @category Object
 * 
 * @template T
 * @returns 
 * A new object type where every property of the original object is 
 * guaranteed to be non-nullable.
 * 
 * @example
 * ```ts
 * import type {NonNullableFlat} from "@vertex/typify"
 * 
 * type A = NonNullableFlat<{ a: string | null, b: number | undefined }>;
 * => type A = { a: string; b: number; };
 * 
 * type B = NonNullableFlat<{ a: string | null, b?: number | undefined }>;
 * => type B = { a: string; b?: number; }
 * 
 * type C = NonNullableFlat<{ a?: string }>;
 * => type C = { a?: string; };
 * ```
 */
export type NonNullableFlat<T> = {
    [K in keyof T]: NonNullable<T[K]>
} & {}

/**
 * @category Object
 * 
 * @example
 * ```ts
 * ```
 */
export type NonNullableDeep<T> = {
    [K in keyof T]: T[K] extends Intrinsic
    ? T[K]
    : NonNullableDeep<NonNullable<T[K]>>
}

/**
 * @category Object
 * 
 * @template T
 * @returns
 * 
 * @example
 * ```ts
 * import type {OptionalKeys} from "@vertex/typify"
 * 
 * type A = { a?: number, b?: string };
 * type B = OptionalKeys<A>;
 * => type B = "a" | "b"
 * ```
 */
export type OptionalKeys<T> = T extends object
    ? keyof {
        [K in keyof T as T extends Required<Pick<T, K>> ? never : K]: never;
    }
    : never;

/**
 * Extracts all required (non-optional) keys from an object type `T`.
 * 
 * @category Object
 * 
 * @template T
 * @returns 
 * A union type of all required keys in `T`. 
 * If there are no required keys, returns `never`.
 * 
 * @example
 * ```ts
 * import type {RequiredKeys} from "@vertex/typify"
 * 
 * type A = RequiredKeys<{ a?: number, b: string }>;
 * => type A = "b";
 * 
 * type B = RequiredKeys<{ a?: number, b?: string }>;
 * => type B = never;
 * ```
 */
export type RequiredKeys<T> = T extends unknown
    ? Exclude<keyof T, OptionalKeys<T>>
    : never;