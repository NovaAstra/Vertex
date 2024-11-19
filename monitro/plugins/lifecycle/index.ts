import {
    type BasePlugin,
    type BasePluginAPI,
    type TransportDataset,
    ERROR_LEVEL_ENUM,
    EVENT_KIND_ENUM,
    ERROR_TYPE_ENUM,
    _global,
    getLocationHref,
    parseStack
} from "@vertex-monitro/core"

export interface LifecyclePluginOptions {

}

export const PLUGIN_NAME = 'LIFECYCLE_PLUGIN' as const

export function LifecyclePlugin(options: LifecyclePluginOptions = {}): BasePlugin {

    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            _global.addEventListener('load', () => {
                
            })

            _global.addEventListener('unload', () => {

            })
        }
    }
}