import { type App, type AppConfig, type ComponentPublicInstance } from "vue"
import {
    type BasePlugin,
    type BasePluginAPI,
    type TransportDataset,
    ERROR_LEVEL_ENUM,
    EVENT_KIND_ENUM,
    ERROR_TYPE_ENUM,
    _global,
    getLocationHref,
    parseErrorEvent
} from "@vertex-monitro/core"

export type Vue3Instance = App;

export interface Vue3PluginOptions {
    vue?: Vue3Instance
}

export interface Vue3Meta {

}

export const PLUGIN_NAME = 'VUE3_PLUGIN' as const

export function Vue3Plugin(options: Vue3PluginOptions = {}): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            const { vue } = options

            if (!vue) return

            vue.config.warnHandler =
                (msg: string, instance: ComponentPublicInstance | null, trace: string) => {
                    const _meta = {

                    } as Vue3Meta
                }

            vue.config.errorHandler =
                (err: unknown, instance: ComponentPublicInstance | null, info: string) => {

                }
        }
    }
}