import { isWindow } from "./is"

export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)

export function getGlobal(): Window {
    if (isBrowserEnv) return window
    return {} as Window
}

const _global = getGlobal()

export { _global }
