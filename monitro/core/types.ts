import { EVENT_TYPE_ENUM, ERROR_LEVEL_ENUM } from "./enums"

export type Key = string | number | symbol

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type VoidFunction = AnyFunction<any[], void>

export type MaybePromise<T> = T | Promise<T>;

export type Pattern = string | RegExp | (string | RegExp)[]

export interface PluginAPI<D = any> {
    next: (data: D | TransportDataset<D>) => void;
    timestamp: () => number
}

export interface Plugin<D = any, C extends ClientContext = ClientContext> {
    name: string;
    setup: (api: PluginAPI<D>, context: C) => MaybePromise<void>;
    transform?: (data: D, context: C) => TransportDataset<D>
}

export type BaseClientOptions = {
    dsn?: string;
    disabled?: boolean
    debug?: boolean;
    record?: boolean;
    localization?: boolean;

    enableTraceId?: boolean;
    traceIdFieldName?: string;
    includeTraceId?: Pattern

    tracesSampleRate?: number;
    maxBreadcrumbs?: number;
    attachStacktrace?: boolean;
    ignoreErrors?: Pattern;
    ignoreRequest?: Pattern;
}

export type BaseClientHooks = {
    backTrackerId?: () => string | number
}

export type ClientOptions = BaseClientOptions & BaseClientHooks

export type ClientContext = {
    options: Required<ClientOptions>
}


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
