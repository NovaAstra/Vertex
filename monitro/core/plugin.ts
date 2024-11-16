export interface SetupApi {

}

export type SetupFunction = (api: SetupApi) => void

export interface Plugin {
    name: string;
    setup: SetupFunction
}

export type PluginFunction = (...args: any[]) => Plugin

export class PluginSystem {
    private plugins: PluginFunction[] = []

    public use(...plugins: PluginFunction[]): PluginFunction[] {
        this.plugins.push(...plugins)
        return this.plugins
    }

    public async launch() {
        const promises = this.plugins.map(plugin => {
            return plugin.setup()
        })
        await Promise.all(promises)
    }
}