import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    _global,
    rewriteProperty,
} from "@vertex-monitro/core"

export interface LifecyclePluginOptions {

}

export const PLUGIN_NAME = 'LIFECYCLE_PLUGIN' as const

export function LifecyclePlugin(options: LifecyclePluginOptions = {}): Plugin {

    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener('load', () => {

            })
            _global.addEventListener('unload', () => {

            })
        }
    }
}