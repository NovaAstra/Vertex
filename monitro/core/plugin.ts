export interface Plugin {
    name: string;
    setup: any
}

export class PluginSystem {
    private plugins: Plugin[] = []

    public use(...plugins: Plugin[]): Plugin[] {
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