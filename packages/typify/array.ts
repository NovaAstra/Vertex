export type AnyArray<T = unknown> = T[] | readonly T[]

export type ReadonlyArray<T = unknown> = readonly T[];

export type Arrayable<T> = T | readonly T[];

export type ArrayValues<T extends AnyArray> = T[number];

export type Length<T extends AnyArray> = T['length']

export type Tail<T extends AnyArray> = T extends readonly []
    ? T
    : T extends readonly [any?, ...infer L]
    ? L
    : T
