import { customAlphabet } from 'nanoid'
import { isString, isRegExp, isArray } from "lodash-es"
import type { AnyFunction, AnyObject, Key, Pattern } from "./types"


export function isType(type: any) {
    return function (value: any): boolean {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}

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

export function getGlobal(): Window {
    if (isBrowserEnv) return window
    return {} as Window
}

export function assign<T extends AnyObject, U extends AnyObject>(
    target: T,
    defaults: Partial<U>,
    options: Partial<U>
) {
    Object.assign(target, defaults, options) as T & Required<U>;
}

export function match(input: string, pattern: Pattern): boolean {
    if (isString(pattern)) return input === pattern

    if (isRegExp(pattern)) return pattern.test(input);

    if (isArray(pattern))
        return pattern.some(p =>
            (isString(p) && input === p) ||
            (isRegExp(p) && p.test(input))
        );

    return false
}

export function isObjectOverSizeLimit(
    object: AnyObject,
    limitInKB: number
): boolean {
    const serializedObject = JSON.stringify(object)
    const sizeInBytes = new TextEncoder().encode(serializedObject).length
    const sizeInKB = sizeInBytes / 1024
    return sizeInKB > limitInKB
}

export function getLocationHref(): string {
    if (typeof document === 'undefined' || document.location == null) return ''
    return document.location.href
}


export function safeStringify(obj: object): string {
    const set = new Set()
    const str = JSON.stringify(obj, function (_key, value) {
        if (set.has(value)) {
            return 'Circular'
        }
        typeof value === 'object' && set.add(value)
        return value
    })
    set.clear()
    return str
}

export function sendByBeacon<D extends AnyObject>(url: string, data: D): boolean {
    if (!url || typeof url !== 'string') {
        console.error('Invalid URL');
        return false;
      }
      if (!data || typeof data !== 'object') {
        console.error('Invalid data');
        return false;
      }
      const formData = new FormData();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          let value = data[key] as any;
          if (typeof value !== 'string' && !(value instanceof Blob)) {
            value = JSON.stringify(value);
          }
          formData.append(key, value);
        }
      }

    return navigator.sendBeacon(url, formData)
}

export function sendByImage<D extends AnyObject>(url: string, data: D): Promise<void> {
    return new Promise(resolve => {
        const beacon = new Image()
        beacon.src = `${url}?v=${encodeURIComponent(safeStringify(data))}`
        beacon.onload = () => resolve()
        beacon.onerror = () => resolve()
    })
}

export function sendByXML<D extends AnyObject>(url: string, data: D): Promise<void> {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open('post', url)
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send(JSON.stringify(data))
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve()
            }
        }
    })
}

export const microtask: AnyFunction<[AnyFunction]> =
    typeof queueMicrotask === "function"
        ? queueMicrotask
        : (fn) => {
            Promise.resolve().then(fn);
        };


export const alphabet = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

export const isWindow = isType('Window')

export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)

export const guid = (size: number = 16): (size?: number) => string => customAlphabet(alphabet, size)

export const traceId = guid(16)

export const appId = guid(36)

export const _global = getGlobal()

