export type AnyArray<T = unknown> = T[] | readonly T[]

export type ReadonlyArray<T = unknown> = readonly T[];

export type Arrayable<T> = T | readonly T[];

export type ArrayValues<T extends AnyArray> = T[number];

