import {
    AnyObject,
    type BasePlugin,
    type BasePluginAPI,
    _global,
} from "@vertex-monitro/core"
import { parse } from "@vertex/erralyze"



export const PLUGIN_NAME = 'VUE2_PLUGIN' as const

export function Vue2Plugin(options: AnyObject = {}): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            const { vue } = options

            if (!vue) return


            vue.config.errorHandler =
                (error: AnyObject, instance: AnyObject | null, info: string) => {
                    api.next(error)
                }
        },
        transform(event: AnyObject) {
            return parse(event)
        }
    }
}