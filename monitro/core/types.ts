import { EVENT_TYPE_ENUM, ERROR_LEVEL_ENUM } from "./enums"

export type Key = string | number | symbol

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type VoidFunction = AnyFunction<any[], void>

export type MaybePromise<T> = T | Promise<T>;

export interface PluginAPI<D = unknown> {
    next: (data: D | TransportDataset<D>) => void;
    timestamp: () => number
}

export interface Plugin<D = any> {
    name: string;
    setup: (api: PluginAPI<D>) => MaybePromise<void>;
    transform?: (data: D) => TransportDataset<D>
}

export type BaseClientOptions = {
    dsn?: string;
    disabled?: boolean
    debug?: boolean;
    record?: boolean;
    localization?: boolean
    enableTraceId?: boolean
    tracesSampleRate?: number;
    maxBreadcrumbs?: number;
    attachStacktrace?: boolean;
    ignoreErrors?: Array<string | RegExp>;
    ignoreRequest?: Array<string | RegExp>;
}

export type BaseClientHooks = {
    backTrackerId?: () => string | number
}

export type ClientOptions = BaseClientOptions & BaseClientHooks


export type LogAgent = 'Chrome'

export interface LogDataset<D> extends TransportDataset<D> {
    guid: string;
    timestamp: string;
    useragent: LogAgent;
}

export interface TransportDataset<D> {
    name: string;
    tag: EVENT_TYPE_ENUM;
    data?: D;
    filename?: string;
    position?: string;
    stack?: string;
    level?: ERROR_LEVEL_ENUM;
    message?: string;
}
