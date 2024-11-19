import { customAlphabet } from 'nanoid'
import { isString, isRegExp, isArray, map, filter } from "lodash-es"
import type { AnyFunction, AnyObject, Key, Pattern, ErrorStack } from "./types"

const FULL_MATCH =
    /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;


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

export function isPromiseRejectedResult(
    event: ErrorEvent | PromiseRejectionEvent
): event is PromiseRejectionEvent {
    return (event as PromiseRejectionEvent).reason !== undefined
}

export function parseStack(error: Error): ErrorStack {
    const { stack = '', message = '' } = error
    const result = { message: message, stack: stack }

    if (stack) {
        const rChromeCallStack = /^\s*at\s*([^(]+)\s*\((.+?):(\d+):(\d+)\)$/
        const rMozlliaCallStack = /^\s*([^@]*)@(.+?):(\d+):(\d+)$/
        const callStackStr = stack.replace(
            new RegExp(`^[\\w\\s:]*${message}\n`),
            ''
        )
        const callStackFrameList = map(
            filter(callStackStr.split('\n'), (item: string) => item),
            (str: string) => {
                const chromeErrResult = str.match(rChromeCallStack)
                if (chromeErrResult) {
                    return {
                        triggerPageUrl: chromeErrResult[2],
                        line: chromeErrResult[3],
                        col: chromeErrResult[4]
                    }
                }

                const mozlliaErrResult = str.match(rMozlliaCallStack)
                if (mozlliaErrResult) {
                    return {
                        triggerPageUrl: mozlliaErrResult[2],
                        line: mozlliaErrResult[3],
                        col: mozlliaErrResult[4]
                    }
                }
                return {}
            }
        )
        const item = callStackFrameList[0] || {}
        return { ...result, ...item }
    }
    return result
}

export function parseError(error: any) {
    if (error instanceof Error) {
        return parseStack(error)
    }

    if (error.message) return parseStack(error)

    if (typeof error === 'string') return { message: error }

    if (isArray(error))
        return { message: error.join(';') }

    return {}
}

export function parseErrorEvent(event: ErrorEvent | PromiseRejectionEvent) {
    if (isPromiseRejectedResult(event)) {
        return { ...parseError(event.reason) }
    }

    const { target } = event
    if (target instanceof HTMLElement) {
        if (target.nodeType === 1) {
            const result = {
                initiatorType: target.nodeName.toLowerCase(),
                requestUrl: ''
            }
            switch (target.nodeName.toLowerCase()) {
                case 'link':
                    result.requestUrl = (target as HTMLLinkElement).href
                    break
                default:
                    result.requestUrl =
                        (target as HTMLImageElement).currentSrc ||
                        (target as HTMLScriptElement).src
            }
            return result
        }
    }

    if (event.error) {
        const e = event.error
        e.fileName = e.filename || event.filename
        e.columnNumber = e.colno || event.colno
        e.lineNumber = e.lineno || event.lineno
        return { ...parseError(e) }
    }


    return {
        line: (_global as any).event.errorLine,
        col: (_global as any).event.errorCharacter,
        errMessage: (_global as any).event.errorMessage,
        triggerPageUrl: (_global as any).event.errorUrl
    }
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
    return navigator.sendBeacon(url, safeStringify(data))
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


const alphabet = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

export const isWindow = isType('Window')

export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)

export const _global = getGlobal()

export const guid = (size: number = 16): (size?: number) => string => customAlphabet(alphabet, size)

export const traceId = guid(16)

export const appId = guid(36)
