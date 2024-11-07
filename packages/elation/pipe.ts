import { _arity } from "./internal/_arity"

export function pipe() {
    if (arguments.length === 0) {
        throw new Error('pipe requires at least one argument')
    }

    return
}