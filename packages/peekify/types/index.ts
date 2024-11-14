export type Key = string | number | symbol

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;
