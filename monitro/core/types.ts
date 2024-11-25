export type Key = string | number | symbol

export type Field = string | number

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type VoidFunction = AnyFunction<any[], void>

export type MaybePromise<T> = T | Promise<T>;

export type Pattern = string | RegExp | (string | RegExp)[]

export interface BasePluginAPI {
    next: (data: AnyObject) => void;
}

export interface BasePlugin {
    name: string;
    setup: (api: BasePluginAPI) => MaybePromise<void>;
    transform?: (data: AnyObject) => AnyObject
}

export type BaseClientOptions = {
    dsn?: string;
    ignoreErrors?: Pattern;
    ignoreRequest?: Pattern;
}

export type BaseClientHooks = {

}


export type ClientOptions = BaseClientOptions & BaseClientHooks

