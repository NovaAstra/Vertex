import { cloneDeep } from "lodash-es"
import { type Plugin } from "./plugin"

export interface ClientOptions {

}

export interface ClientContext {

}

export abstract class Client {
    private readonly options: ClientOptions;

    private context: ClientContext;

    public constructor(options: ClientOptions) {
        this.options = options
        this.context = {}
    }

    public use(plugins: Plugin[]) {
        for (const plugin of plugins) {
            const { name, setup } = plugin

            if (!name) continue;

            if (!setup) continue
        }
    }

    public getClientOptions(): ClientOptions {
        return cloneDeep(this.options)
    }

    public getClientContext() {
        return cloneDeep(this.context)
    }
}