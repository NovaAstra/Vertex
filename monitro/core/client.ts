import { isFunction } from "lodash-es"
import type {
    ClientOptions,
    ClientContext,
    AnyObject,
    Plugin,
    PluginAPI,
    TransportDataset,
    AnyFunction
} from "./types"
import { match, traceId } from "./utiltes";

export type TraceIdCallback = (field: string, traceId: string) => void

export interface BaseOptions extends ClientOptions {
    setTraceId: (http: string, callback: TraceIdCallback) => void;
    use(plugins: Plugin[]): Promise<void>
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

export function createApis<D = unknown>(this: Client, plugin: Plugin<D>): PluginAPI<D> {
    const context = this.context
    const api = Object.create(null)

    api.next = (data: D) => {
        const dataset = isFunction(plugin.transform)
            ? plugin.transform.apply(this, [data, context])
            : data as TransportDataset<D>

        if (!this.initialized) {
            this.tasks.push(dataset)
            return
        }

        this.send(dataset)
    }

    return api
}

export function createContext(this: Client): ClientContext {
    const context = Object.create(null)

    context.options = this.options

    return context as ClientContext
}

export abstract class Client<T extends ClientOptions = ClientOptions> implements BaseOptions {

    protected readonly options: T;

    protected appId!: string;

    protected initialized: boolean = false

    protected readonly tasks: AnyObject[] = []

    public context!: ClientContext;

    public constructor(options: T) {
        this.options = Object.assign({}, DEFAULT_CLIENT_OPTIONS, options)

        this.context = createContext.call(this)

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

    public async use(plugins: Plugin[]): Promise<void> {
        const context = this.context

        for (const plugin of plugins) {
            const apis = createApis.call(this, plugin)
            await plugin.setup.apply(this, [apis, context])
        }
    }

    public abstract nextTick(callback: AnyFunction, task: AnyObject): void

    public abstract send<D>(dataset: D): Promise<void>

    protected abstract launch(): Promise<string>;

    private execute() {
        while (this.tasks.length) {
            const task = this.tasks.shift()!;
            this.nextTick(this.send, task)
        }
    }
}