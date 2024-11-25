import { type App,  type ComponentPublicInstance } from "vue"
import {
    type BasePlugin,
    type BasePluginAPI,
    _global,
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


            vue.config.errorHandler =
                (err: unknown, instance: ComponentPublicInstance | null, info: string) => {

                }
        }
    }
}