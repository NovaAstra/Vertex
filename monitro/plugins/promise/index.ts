import {
    type BasePlugin,
    type BasePluginAPI,
    type AnyObject,
    _global,
} from "@vertex-monitro/core"
import {parse} from "@vertex/erralyze"

export const PLUGIN_NAME = 'PROMISE_PLUGIN' as const

export function PromisePlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup(api: BasePluginAPI) {
            _global.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                event.preventDefault();

                api.next(event)
            })
        },
        transform(event: AnyObject) {
            return parse(event as ErrorEvent)
        }
    }
}