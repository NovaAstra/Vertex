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

export interface TransportDataset<D> {
    logId: string;
    timestamp: number;
    data?: D
}

export interface Plugin<D = any> {
    name: string;
    setup: (api: PluginAPI<D>) => MaybePromise<void>;
    transform?: (data: D) => TransportDataset<D>
}

export type App = {
    name: string;
    version?: string;
    description?: string;
}

export type ClientConfig = {
    app: App;
    dsn: string;
    debug?: boolean;
    tracesSampleRate?: number;
    maxBreadcrumbs?: number;
    attachStacktrace?: boolean;
}


export interface BreadcrumbConfig {
    maxBreadcrumbs: number;
}

export type LogMessage = string;

export type LogAgent = 'Chrome'

export interface LogDataset<D = any> {
    name: string;
    page: string;
    timestamp: string;
    agent: LogAgent;

    tag: EVENT_TYPE_ENUM;

    data?: D;

    file?: string;
    position?: string;

    level?: ERROR_LEVEL_ENUM;
    message?: LogMessage;
}