import { isFunction } from "lodash-es"
import type {
    ClientOptions,
    AnyObject,
    BasePlugin,
    BasePluginAPI,
    AnyFunction,
} from "./types"


export interface BaseOptions extends ClientOptions {
    use(plugins: BasePlugin[]): Promise<void>
}

export const DEFAULT_CLIENT_OPTIONS: Partial<ClientOptions> = {
}

export function createApis(
    this: Client,
    plugin: BasePlugin
): BasePluginAPI {
    const api = Object.create(null)

    api.next = (data: AnyObject) => {
        const dataset = isFunction(plugin.transform)
            ? plugin.transform.call(this, data)
            : data


        if (!this.initialized) {
            this.tasks.push(dataset)
            return
        }

        this.nextTick(this.send, dataset)
    }

    api.emit = (data: AnyObject) => {
        this.nextTick(this.send, data)
    }

    return api
}


export abstract class Client<T extends ClientOptions = ClientOptions> implements BaseOptions {

    public readonly options: T;

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

    public async use(plugins: BasePlugin[]): Promise<void> {
        for (const plugin of plugins) {
            const apis = createApis.call(this, plugin)
            await plugin.setup.call(this, apis)
        }
    }

    public abstract nextTick(callback: AnyFunction, task: AnyObject): void

    public abstract send<D>(url: string, dataset: D): Promise<void>

    protected abstract launch(): Promise<string>;

    private execute() {
        while (this.tasks.length) {
            const task = this.tasks.shift()!;
            this.nextTick(this.send, task)
        }
    }
}