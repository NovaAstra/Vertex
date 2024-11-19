import { isFunction } from "lodash-es"
import type {
    ClientOptions,
    AnyObject,
    BasePlugin,
    BasePluginAPI,
    TransportDataset,
    AnyFunction,
    Field
} from "./types"
import { match, traceId } from "./utiltes";

export type TraceIdCallback = (field: string, traceId: string) => void

export interface BaseOptions extends ClientOptions {
    setTraceId: (http: string, callback: TraceIdCallback) => void;
    use(plugins: BasePlugin[]): Promise<void>
}

export const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
    debug: true,
    tracesSampleRate: 1,
    maxBreadcrumbs: 100,
    attachStacktrace: true,
    traceIdFieldName: 'X-Trace-Id',
    enableTraceId: false,
    includeTraceId: /.*/
}

export function createApis<K extends Field = Field, T extends Field = Field, D = any>(
    this: Client,
    plugin: BasePlugin<K, T, D>
): BasePluginAPI<K, T, D> {
    const api = Object.create(null)

    api.next = (data: D) => {
        const dataset = isFunction(plugin.transform)
            ? plugin.transform.call(this, data)
            : data as TransportDataset<K, T, D>

        console.log(dataset)

        if (!this.initialized) {
            this.tasks.push(dataset)
            return
        }

        // this.send(this.options.dsn!, dataset)
    }

    return api
}


export abstract class Client<T extends ClientOptions = ClientOptions> implements BaseOptions {

    protected readonly options: T;

    protected appId!: string;

    protected initialized: boolean = false

    protected readonly tasks: AnyObject[] = []


    public constructor(options: T) {
        this.options = Object.assign({}, DEFAULT_CLIENT_OPTIONS, options)

        this.launch().then(appId => {
            if (appId && this.appId !== appId) {
                this.appId = appId
            }

            this.initialized = true
            this.execute()
        })
    }

    public setTraceId(http: string, callback: TraceIdCallback) {
        const { traceIdFieldName, enableTraceId, includeTraceId } = this.options as Required<ClientOptions>

        if (enableTraceId && includeTraceId && match(http, includeTraceId)) {
            callback(traceIdFieldName, traceId())
        }
    }

    public async use(plugins: BasePlugin[]): Promise<void> {
        for (const plugin of plugins) {
            const apis = createApis.call(this, plugin)
            await plugin.setup.call(this, apis)
        }
    }

    public abstract nextTick(callback: AnyFunction, ...args: any[]): void

    public abstract send<D>(url: string, dataset: D): Promise<void>

    protected abstract launch(): Promise<string>;

    private execute() {
        while (this.tasks.length) {
            const task = this.tasks.shift()!;
            this.nextTick(this.send)
        }
    }
}