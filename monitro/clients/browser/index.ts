import { type ClientOptions, type Plugin, Client, Transport, Breadcrumb } from "@vertex-monitro/core"
import { XHRPlugin } from "@vertex-monitro-plugin/xhr"
import { Vue3Plugin } from "@vertex-monitro-plugin/vue3"

export interface BrowserOptions extends ClientOptions { }


export class BrowserClient extends Client {
    protected readonly transport: Transport = new Transport()

    protected readonly breadcrumb: Breadcrumb = new Breadcrumb()

    public constructor(options: BrowserOptions) {
        super(options);
    }

    public async launch() { }
}

export function MonitroClient(options: BrowserOptions) {
    const client = new BrowserClient(options);

    const plugins: Plugin[] = [
        XHRPlugin(),
        Vue3Plugin()
    ]

    client.use(plugins)

    return client
}