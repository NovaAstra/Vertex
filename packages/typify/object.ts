export type NonNullableFlat<T> = {
    [K in keyof T]: NonNullable<T[K]>
} & {}
