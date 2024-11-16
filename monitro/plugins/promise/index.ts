import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    _global,
    rewriteProperty,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'PROMISE_PLUGIN' as const

export function PromisePlugin(): Plugin {
    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
                event.preventDefault();
            })
        }
    }
}