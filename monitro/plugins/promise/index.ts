import {
    type Plugin,
    type PluginAPI,
    EVENT_TYPE_ENUM,
    _global,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'PROMISE_PLUGIN' as const

export function PromisePlugin(): Plugin {
    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                console.log(event, "event1")
                event.preventDefault();
            })
        }
    }
}