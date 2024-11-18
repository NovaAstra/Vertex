import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    type PluginAPI,
    _global
} from "@vertex-monitro/core"

export interface LifecyclePluginOptions {

}

export const PLUGIN_NAME = 'LIFECYCLE_PLUGIN' as const

export function LifecyclePlugin(options: LifecyclePluginOptions = {}): Plugin {

    return {
        name: PLUGIN_NAME,
        setup(api: PluginAPI) {
            _global.addEventListener('load', () => {
                
            })

            _global.addEventListener('unload', () => {

            })
        }
    }
}