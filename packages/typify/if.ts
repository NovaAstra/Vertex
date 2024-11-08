import type { IsAny, IsNull, IsNever, IsUnknown } from "./is"

export type IfAny<T, Y = true, N = false> = (
    IsAny<T> extends true ? Y : N
);

export type IfNull<T, Y = true, N = false> = (
    IsNull<T> extends true ? Y : N
);

export type IfNever<T, Y = true, N = false> = (
    IsNever<T> extends true ? Y : N
);

export type IfUnknown<T, Y = true, N = false> = (
    IsUnknown<T> extends true ? Y : N
);
