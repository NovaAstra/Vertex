import type {
    AnyFunction,
    ImmutableArray,
    RequiredIndices,
} from "@vertex/typify"



// export type Curried<T extends AnyFunction> =
//     <
//         P extends Gaps<Parameters<T>>,
//         N extends ImmutableArray,
//         R extends any = ReturnType<T>
//     >(...args: Gaps<Parameters<T>> | P) =>
//         RequiredIndices<N> extends never
//         ? R
//         : Curried<(...args: N) => R>

// export function curry<T extends unknown[], R>(
//     fn: (...args: T) => R,
//     ...args: Partial<T>
// ): any {
//     const curried = (..._args: T): R => {
//         const combined = args.concat(_args) as T;
//         return combined.length >= fn.length ?
//             fn(...combined) :
//             curried.bind(null, ...combined)
//     }
//     return curried
// }
