import {
    ERROR_LEVEL_ENUM,
    EVENT_KIND_ENUM,
    PERFORMANCE_TYPE_ENUM,
    ERROR_TYPE_ENUM,
    BEHAVIOR_TYPE_ENUM,
    SEND_TYPE_ENUM
} from "./enums"

export type Key = string | number | symbol

export type Field = string | number

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type VoidFunction = AnyFunction<any[], void>

export type MaybePromise<T> = T | Promise<T>;

export type Pattern = string | RegExp | (string | RegExp)[]

export type EventKind = EVENT_KIND_ENUM

export type EventType = PERFORMANCE_TYPE_ENUM | ERROR_TYPE_ENUM | BEHAVIOR_TYPE_ENUM | SEND_TYPE_ENUM


export interface BasePluginAPI<K extends Field = Field, T extends Field = Field, D = any> {
    next: (data: D | TransportDataset<K, T, D>) => void;
    timestamp: () => number
}

export interface BasePlugin<
    K extends Field = Field,
    T extends Field = Field,
    D = any
> {
    name: string;
    setup: (api: BasePluginAPI<K, T, D>) => MaybePromise<void>;
    transform?: (data: D) => TransportDataset<K, T, D>
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

export type LogAgent = 'Chrome'


export interface ErrorStack {
    message: string
    stack: string
}

export interface BaseLogDataset<
    K extends Field = Field,
    T extends Field = Field,
    D = any
> extends
    TransportDataset<K, T, D> {
    guid: string;
    timestamp: string;
    useragent: LogAgent;
}


export interface TransportDataset<K extends Field = Field, T extends Field = Field, D = any> {
    kind: K;
    type: T;
    name: string;
    data?: D;
    filename?: string;
    position?: string;
    stack?: string;
    level?: ERROR_LEVEL_ENUM;
    message?: string;
}
