import {
    type ClientOptions,
    type BasePlugin,
    type AnyObject,
    type AnyFunction,
    _global,
    isObjectOverSizeLimit,
    Client,
    Breadcrumb,
    sendByBeacon,
    sendByImage,
    sendByXML,
    microtask,
    appId
} from "@vertex-monitro/core"
import { StackPlugin } from "@vertex-monitro-plugin/stack"
import { PromisePlugin } from "@vertex-monitro-plugin/promise"
import { Vue2Plugin } from "@vertex-monitro-plugin/vue2"


export type BrowserPlugin = BasePlugin

export interface BrowserOptions extends ClientOptions {
    plugins?: BrowserPlugin[]
}

export interface BrowserLogDataset {
    route: string;
}

const sendType = (data: AnyObject): number => {
    if (_global.navigator) {
        return isObjectOverSizeLimit(data, 60) ? 3 : 1
    }

    return isObjectOverSizeLimit(data, 2) ? 3 : 2
}

export class BrowserClient extends Client {
    protected readonly breadcrumb: Breadcrumb

    public constructor(options: BrowserOptions) {
        super(options);
        this.breadcrumb = new Breadcrumb()
    }

    public async launch() {
        const { dsn } = this.options

        this.send(dsn!, {})

        return appId();
    }

    public nextTick(callback: AnyFunction, task: AnyObject) {
        const { dsn } = this.options
        return microtask(() => callback(dsn!, task))
    }

    public async send(url: string, data: AnyObject) {
        console.log(data)
        const type = sendType({errorInfo: JSON.stringify(data), page:window.location.href})
        switch (type) {
            case 1:
                sendByBeacon(url, data)
                break
            case 2:
                sendByImage(url, data)
                break
            default:
                sendByXML(url, data)
                break
        }
    }
}

export function MonitroClient(options: BrowserOptions) {
    const client = new BrowserClient(options);

    const plugins: BrowserPlugin[] = [
        StackPlugin(),
        PromisePlugin(),
        Vue2Plugin({
            vue: (options as any).vue
        })
    ]

    if (Array.isArray(options.plugins)) plugins.push(...options.plugins)

    client.use(plugins)

    return client
}