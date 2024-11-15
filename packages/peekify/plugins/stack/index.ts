import {
    type VoidFunction,
    type AnyObject,
    type BasePlugin,
    _global,
    rewriteProperty,
} from "@vertex/peekify"

export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): BasePlugin {
    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener("error", (event: ErrorEvent) => {
                event.preventDefault();
            })
        }
    }
}