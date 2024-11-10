import type { Not } from "./basic"
import type { Zero, PositiveInfinity, NegativeInfinity } from "./number"

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNull<T> = [T] extends [null] ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsTuple<T> =
    T extends readonly any[]
    ? (any[] extends T ? never : T)
    : never;

export type IsFloat<T> =
    T extends number
    ? `${T}` extends `${infer _ extends '' | '-'}${number}.${infer D extends number}`
    ? D extends Zero
    ? false
    : true
    : false
    : false;

export type IsInteger<T> =
    T extends bigint
    ? true
    : T extends number
    ? number extends T
    ? false
    : T extends PositiveInfinity | NegativeInfinity
    ? false
    : Not<IsFloat<T>>
    : false;

export type IsUnknown<T> =
    unknown extends T
    ? IsNull<T> extends false
    ? true
    : false
    : false

export type IsEqual<T1, T2> =
    (<G>() => G extends T1 ? 1 : 2) extends
    (<G>() => G extends T2 ? 1 : 2)
    ? true
    : false;
