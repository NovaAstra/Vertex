import {
    type VoidFunction,
    type AnyObject,
    type BasePlugin,
    rewriteProperty
} from "@vertex/peekify"

export interface LifecyclePluginOptions {

}

export const PLUGIN_NAME = 'LIFECYCLE_PLUGIN' as const

export function LifecyclePlugin(options: LifecyclePluginOptions = {}): BasePlugin {

    return {
        name: PLUGIN_NAME,
    }
}