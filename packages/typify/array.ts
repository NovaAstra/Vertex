export type AnyArray<T = any> = T[] | readonly T[]

export type Arrayable<T> = T | readonly T[];

export type ArrayValues<T extends readonly unknown[]> = T[number];

export type ArrayLength<T extends readonly unknown[]> = T extends { readonly length: infer L } ? L : never;

export type ArrayTail<T extends readonly unknown[]> = T extends readonly []
    ? T
    : T extends readonly [any?, ...infer L]
    ? L
    : T

export type ArrayLast<T extends AnyArray> = T[ArrayLength<ArrayTail<T>>]