import type { Plugin } from "./types"

export abstract class PluginSystem {
    public abstract use(plugins: Plugin[]): Promise<void>
}