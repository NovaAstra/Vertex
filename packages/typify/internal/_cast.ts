export type Cast<T, U> =
    T extends unknown
    ? U extends unknown
    ? T extends U
    ? T
    : U
    : never
    : never;