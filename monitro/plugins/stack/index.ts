import {
    type Plugin,
    _global,
} from "@vertex-monitro/core"

export const PLUGIN_NAME = 'STACK_PLUGIN' as const

export function StackPlugin(): Plugin {
    return {
        name: PLUGIN_NAME,
        setup(api) {
            _global.addEventListener("error", (event: ErrorEvent) => {
                event.preventDefault();

                console.log(event)

                api.next({})
            })
        }
    }
}