import { type IsAny } from "./is"

export type IfAny<U, T = true, N = false> = (
    IsAny<U> extends true ? T : N
);
