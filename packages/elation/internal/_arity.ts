/**
 * @internal
 */
export function _arity<T extends (...args: Array<any>) => any>(
    n: number,
    fn: T
): (...args: Parameters<T>) => ReturnType<T> {
    return fn.apply(this, Array.prototype.slice.call(arguments, 0, n))
}