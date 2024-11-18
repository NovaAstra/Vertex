import { isFunction } from "lodash-es"
import type { ClientConfig, AnyObject, Plugin, PluginAPI, TransportDataset, AnyFunction } from "./types"
import { PluginSystem } from "./plugin"
import { Transport } from "./transport"
import { Breadcrumb } from "./breadcrumb"

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

export function createApis<D = unknown>(this: Client, plugin: Plugin<D>): PluginAPI<D> {
    const api = Object.create(null)

    api.next = (data: D) => {
        const dataset = isFunction(plugin.transform)
            ? plugin.transform.call(this, data)
            : data as TransportDataset<D>

        if (!this.initialized) {
            this.tasks.push(dataset)
            return
        }

        this.transport.send(dataset)
    }

    return api
}

export abstract class Client implements PluginSystem {

    protected abstract transport: Transport

    protected abstract breadcrumb: Breadcrumb

    protected readonly options: ClientOptions;

    protected appid!: string;

    protected initialized: boolean = false

    protected readonly tasks: AnyObject[] = []

    public constructor(options: ClientOptions) {
        this.options = Object.assign({}, DEFAULT_CLIENT_OPTIONS, options)

        this.launch().then(appid => {
            if (appid && this.appid !== appid) {
                this.appid = appid
            }

            this.initialized = true
            this.execute()
        })
    }

    public async use(plugins: Plugin[]): Promise<void> {
        for (const plugin of plugins) {
            const apis = createApis.call(this, plugin)
            await plugin.setup.call(this, apis)
        }
    }

    protected abstract launch(): Promise<string>;

    protected abstract nextTick(callback: AnyFunction): void

    private execute() {
        while (this.tasks.length) {
            const task = this.tasks.shift();
            this.nextTick(this.transport.send)
        }
    }
}