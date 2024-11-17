import type { AnyFunction, AnyObject, Key } from "./types"


function isType(type: any) {
    return function (value: any): boolean {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

export function getGlobal(): Window {
    if (isBrowserEnv) return window
    return {} as Window
}

export const isWindow = isType('Window')

export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)

export const _global = getGlobal()

export function rewriteProperty(
    source: AnyObject,
    property: Key,
    replacement: AnyFunction,
    force: boolean = false
): void {
    if (source === undefined) return

    if (property in source || force) {
        const original = source[property];
        const wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[property] = wrapped;
        }
    }
}