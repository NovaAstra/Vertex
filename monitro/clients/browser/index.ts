import {
    type ClientOptions,
    type Plugin,
    type LogDataset,
    type AnyObject,
    Client,
    Breadcrumb,
    AnyFunction
} from "@vertex-monitro/core"
import { XHRPlugin } from "@vertex-monitro-plugin/xhr"
import { StackPlugin } from "@vertex-monitro-plugin/stack"
import { PromisePlugin } from "@vertex-monitro-plugin/promise"
import { LifecyclePlugin } from "@vertex-monitro-plugin/lifecycle"

export interface BrowserOptions extends ClientOptions {
    plugins?: Plugin[]
}

export interface BrowserLogDataset<D> extends LogDataset<D> {
    route: string;
}


export class BrowserClient extends Client {
    protected readonly breadcrumb: Breadcrumb

    public constructor(options: BrowserOptions) {
        super(options);
        this.breadcrumb = new Breadcrumb()
    }

    public async launch() {
        return ''
    }

    public nextTick(callback: AnyFunction, task: AnyObject) {

    }

    public async send<D>(data: D) {

    }
}

export function MonitroClient(options: BrowserOptions) {
    const client = new BrowserClient(options);

    const plugins: Plugin[] = [
        XHRPlugin(),
        StackPlugin(),
        PromisePlugin(),
        LifecyclePlugin()
    ]

    if (Array.isArray(options.plugins)) plugins.push(...options.plugins)

    client.use(plugins)

    return client
}