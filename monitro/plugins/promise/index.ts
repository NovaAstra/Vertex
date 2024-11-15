import {
    type VoidFunction,
    type AnyObject,
    type BasePlugin,
    _global,
    rewriteProperty,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'PROMISE_PLUGIN' as const

export function PromisePlugin() {
    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                event.preventDefault();
            })
        }
    }
}