export type Curried<T extends unknown[], R> = T extends [] ? R : ''

export function curry<T extends unknown[], R>(
    fn: (...args: T) => R,
    ...args: Partial<T>
) {
    const curried = (..._args: T) =>
        _args.length >= fn.length ? fn(..._args) : curry(fn, ..._args)

    return curried.bind(null, ...args)
}