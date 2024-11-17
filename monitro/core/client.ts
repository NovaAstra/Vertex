import type { ClientConfig, AnyObject } from "./types"
import { type Plugin, PluginSystem } from "./plugin"

export interface ClientOptions extends ClientConfig {
}

export interface ClientContext {
    options: ClientConfig;
}

export const DEFAULT_CLIENT_OPTIONS: Partial<ClientOptions> = {
    debug: true,
    tracesSampleRate: 1,
    maxBreadcrumbs: 100,
    attachStacktrace: true
}

export abstract class Client {
    private initialized: boolean = false

    private readonly options: ClientOptions;

    private readonly system: PluginSystem = new PluginSystem()

    public context: ClientContext | null = null;

    public constructor(options: ClientOptions) {
        this.options = Object.assign({}, DEFAULT_CLIENT_OPTIONS, options)
    }


    public use(...plugins: Plugin[]): void {
    }

    private apply() { }

    protected abstract initAPP(): Promise<string>;

    protected abstract transform(datas: AnyObject): AnyObject;
}