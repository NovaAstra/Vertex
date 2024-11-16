import {
    type VoidFunction,
    type AnyObject,
    type Plugin,
    _global,
    rewriteProperty,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): Plugin {
    return {
        name: PLUGIN_NAME,
        setup() {
            _global.addEventListener("error", (event: ErrorEvent) => {
                event.preventDefault();
            })
        }
    }
}