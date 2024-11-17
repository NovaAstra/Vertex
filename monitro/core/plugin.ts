import type { MaybePromise } from "./types"

export interface PluginAPI<M = unknown> {
    next: (meta: M) => void;
    _t: () => number
}

export interface Plugin<M = unknown> {
    name: string;
    setup: (api: PluginAPI<M>) => MaybePromise<void>;
}

export class PluginContext {
    public version: string = "0.0.0"
}

export class PluginSystem {
    private plugins: Plugin[] = []
}