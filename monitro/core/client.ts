import { cloneDeep } from "lodash-es"
import { type Plugin } from "./plugin"

export interface App {
    name: string;
    version: string;
}

export interface ClientOptions {

}

export interface ClientContext {
    app: App;
    debug: boolean;
    enabled: boolean;
}

export abstract class Client {
    private readonly options: ClientOptions;

    public context: ClientContext | null = null;

    public constructor(options: ClientOptions) {
        this.options = options
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