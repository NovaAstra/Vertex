import { cloneDeep } from "lodash-es"
import { type Plugin, PluginSystem } from "./plugin"

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

    private readonly system: PluginSystem = new PluginSystem()

    public context: ClientContext | null = null;

    public constructor(options: ClientOptions) {
        this.options = options
    }

    public use(...plugins: Plugin[]): void {
        this.system.use(...plugins)
    }

    public getClientOptions(): ClientOptions {
        return cloneDeep(this.options)
    }

    public getClientContext() {
        return cloneDeep(this.context)
    }
}