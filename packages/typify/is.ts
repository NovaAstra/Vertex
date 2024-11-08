export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNull<T> = [T] extends [null] ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsTuple<Type> = Type extends readonly any[] ? (any[] extends Type ? never : Type) : never;

export type IsUnknown<T> =
    unknown extends T
    ? IsNull<T> extends false
    ? true
    : false
    : false

export type IsEqual<A, B> =
    (<G>() => G extends A ? 1 : 2) extends
    (<G>() => G extends B ? 1 : 2)
    ? true
    : false;
