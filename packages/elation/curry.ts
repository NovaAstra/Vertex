// export type Curried<T extends unknown[], R> = T extends [] ? R : ''

export function curry<T extends unknown[], R>(
    fn: (...args: T) => R,
    ...args: Partial<T>
): T["length"] extends 0 ? () => R : any {
    const curried = (..._args: T): R => {
        const combined = args.concat(_args) as T;
        return combined.length >= fn.length ?
            fn(...combined) :
            curried.bind(null, ...combined)
    }
    return curried
}

const fn = (a, b, c) => a + b + c
const curried = curry(fn, 1, 2, 3)()
// const sum = curried(1)

// const result = sum(3) // => 6

console.log(curried)