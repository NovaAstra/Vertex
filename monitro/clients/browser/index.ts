import { type ClientOptions, type Plugin, Client, Transport, Breadcrumb } from "@vertex-monitro/core"
import { XHRPlugin } from "@vertex-monitro-plugin/xhr"
import { StackPlugin } from "@vertex-monitro-plugin/stack"
import { PromisePlugin } from "@vertex-monitro-plugin/promise"
import { LifecyclePlugin } from "@vertex-monitro-plugin/lifecycle"

export interface BrowserOptions extends ClientOptions { }


export class BrowserClient extends Client {
    protected readonly transport: Transport = new Transport()

    protected readonly breadcrumb: Breadcrumb = new Breadcrumb()

    public constructor(options: BrowserOptions) {
        super(options);
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

    client.use(plugins)

    return client
}