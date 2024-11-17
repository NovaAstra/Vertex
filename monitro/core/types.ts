import { BrowserBreadcrumbEnum, BreadcrumbLevel } from "./enums"

export type Key = string | number | symbol

export type AnyObject = Record<Key, any>

export type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

export type VoidFunction = AnyFunction<any[], void>

export type MaybePromise<T> = T | Promise<T>;

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

export type BreadcrumbTypes = BrowserBreadcrumbEnum

export interface BreadcrumbStack {
    l: string;
    b: BreadcrumbTypes;
    m: string;
    t: number;
    lv?: BreadcrumbLevel;
}

export interface BreadcrumbConfig {
    maxBreadcrumbs: number;
}