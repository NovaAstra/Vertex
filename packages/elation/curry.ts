export type Curried<T extends unknown[], R> = T extends [] ? R : ''

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
